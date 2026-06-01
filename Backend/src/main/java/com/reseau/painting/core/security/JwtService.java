package com.reseau.painting.core.security;

import com.reseau.painting.core.tenant.TenantContext;
import com.reseau.painting.painting.domain.Utilisateur;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtService {

    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private static final String HEADER_SEGMENT = "alg=HS256&typ=JWT";

    private final SecretKeySpec secretKey;
    private final Duration accessTokenValidity;
    private final Duration refreshTokenValidity;
    private final String issuer;

    public JwtService(
            @Value("${jwt.secret:painting-dev-secret-key-painting-dev-secret-key}") String secret,
            @Value("${jwt.access-token-validity:PT15M}") String accessValidityIso,
            @Value("${jwt.refresh-token-validity:P14D}") String refreshValidityIso,
            @Value("${jwt.issuer:painting-backend}") String issuer
    ) {
        if (secret == null || secret.trim().length() < 32) {
            throw new IllegalArgumentException("jwt.secret must contain at least 32 characters");
        }

        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
        this.accessTokenValidity = Duration.parse(accessValidityIso);
        this.refreshTokenValidity = Duration.parse(refreshValidityIso);
        this.issuer = issuer;
    }

    public String generateToken(Utilisateur utilisateur) {
        if (utilisateur == null || utilisateur.getId() == null) {
            throw new IllegalArgumentException("utilisateur must not be null");
        }

        List<String> roles = utilisateur.getRole() == null || utilisateur.getRole().isBlank()
                ? List.of("ROLE_USER")
                : List.of(normalizeAuthority(utilisateur.getRole()));

        String tenant = Optional.ofNullable(TenantContext.getCurrentTenant())
                .filter(value -> !value.isBlank())
                .orElse("painting");

        return generateAccessToken(utilisateur.getId().toString(), roles, tenant);
    }

    public String generateAccessToken(String userId, Collection<String> roles, String tenant) {
        Instant now = Instant.now();
        Instant expiry = now.plus(accessTokenValidity);

        Map<String, String> claims = new LinkedHashMap<>();
        claims.put("sub", userId);
        claims.put("iss", issuer);
        claims.put("iat", Long.toString(now.getEpochSecond()));
        claims.put("exp", Long.toString(expiry.getEpochSecond()));
        claims.put("jti", UUID.randomUUID().toString());
        claims.put("typ", "access");
        claims.put("roles", String.join(",", normalizeAuthorities(roles)));
        claims.put("tenant", tenant == null || tenant.isBlank() ? "painting" : tenant.trim().toLowerCase());

        return createToken(claims);
    }

    public String generateRefreshToken(String userId) {
        Instant now = Instant.now();
        Instant expiry = now.plus(refreshTokenValidity);

        Map<String, String> claims = new LinkedHashMap<>();
        claims.put("sub", userId);
        claims.put("iss", issuer);
        claims.put("iat", Long.toString(now.getEpochSecond()));
        claims.put("exp", Long.toString(expiry.getEpochSecond()));
        claims.put("jti", UUID.randomUUID().toString());
        claims.put("typ", "refresh");
        claims.put("roles", "");
        claims.put("tenant", Optional.ofNullable(TenantContext.getCurrentTenant())
            .filter(value -> !value.isBlank())
            .orElse("painting"));

        return createToken(claims);
    }

    public TokenData parseAndValidate(String token) {
        if (token == null || token.isBlank()) {
            throw new TokenValidationException("Token is missing");
        }

        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            throw new TokenValidationException("Token must have 3 parts");
        }

        verifySignature(parts[0] + "." + parts[1], parts[2]);

        Map<String, String> header = parseKeyValueSegment(decodeSegment(parts[0]));
        if (!"HS256".equals(header.get("alg")) || !"JWT".equals(header.get("typ"))) {
            throw new TokenValidationException("Unsupported token header");
        }

        Map<String, String> payload = parseKeyValueSegment(decodeSegment(parts[1]));

        if (!issuer.equals(payload.get("iss"))) {
            throw new TokenValidationException("Invalid issuer");
        }

        Instant issuedAt = Instant.ofEpochSecond(parseLong(payload.get("iat"), "iat"));
        Instant expiresAt = Instant.ofEpochSecond(parseLong(payload.get("exp"), "exp"));
        if (expiresAt.isBefore(Instant.now())) {
            throw new TokenValidationException("Token expired");
        }

        return new TokenData(
                required(payload, "sub"),
                required(payload, "jti"),
                payload.get("iss"),
                issuedAt,
                expiresAt,
                extractRoles(payload.get("roles")),
                payload.get("tenant"),
                payload.get("typ"),
                new LinkedHashMap<>(payload)
        );
    }

    public boolean isTokenValid(String token) {
        try {
            parseAndValidate(token);
            return true;
        } catch (TokenValidationException ex) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            return parseAndValidate(token).expiresAt().isBefore(Instant.now());
        } catch (TokenValidationException ex) {
            return true;
        }
    }

    public String getSubject(String token) {
        return parseAndValidate(token).subject();
    }

    public String getJti(String token) {
        return parseAndValidate(token).jti();
    }

    public List<String> getRoles(String token) {
        return parseAndValidate(token).roles();
    }

    public String getTenant(String token) {
        return parseAndValidate(token).tenant();
    }

    public Optional<String> safelyGetSubject(String token) {
        try {
            return Optional.ofNullable(getSubject(token));
        } catch (TokenValidationException ex) {
            return Optional.empty();
        }
    }

    public Duration getAccessTokenValidity() {
        return accessTokenValidity;
    }

    public Duration getRefreshTokenValidity() {
        return refreshTokenValidity;
    }

    private String createToken(Map<String, String> claims) {
        String headerSegment = encodeSegment(HEADER_SEGMENT);
        String payloadSegment = encodeSegment(serializeKeyValueSegment(claims));
        String signingInput = headerSegment + "." + payloadSegment;
        String signature = sign(signingInput);
        return signingInput + "." + signature;
    }

    private void verifySignature(String signingInput, String signaturePart) {
        String expectedSignature = sign(signingInput);
        if (!MessageDigest.isEqual(
                expectedSignature.getBytes(StandardCharsets.UTF_8),
                signaturePart.getBytes(StandardCharsets.UTF_8))) {
            throw new TokenValidationException("Invalid token signature");
        }
    }

    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(secretKey);
            return encodeSegment(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (GeneralSecurityException ex) {
            throw new TokenValidationException("Unable to sign token", ex);
        }
    }

    private Map<String, String> parseKeyValueSegment(String segment) {
        Map<String, String> values = new LinkedHashMap<>();
        if (segment.isBlank()) {
            return values;
        }

        String[] entries = segment.split("&");
        for (String entry : entries) {
            int separator = entry.indexOf('=');
            if (separator < 0) {
                throw new TokenValidationException("Invalid token payload");
            }

            String key = decodeComponent(entry.substring(0, separator));
            String value = decodeComponent(entry.substring(separator + 1));
            values.put(key, value);
        }

        return values;
    }

    private String serializeKeyValueSegment(Map<String, String> values) {
        return values.entrySet().stream()
                .map(entry -> encodeComponent(entry.getKey()) + "=" + encodeComponent(entry.getValue() == null ? "" : entry.getValue()))
                .collect(Collectors.joining("&"));
    }

    private String encodeSegment(String value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private String encodeSegment(byte[] value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value);
    }

    private String decodeSegment(String value) {
        return new String(Base64.getUrlDecoder().decode(value), StandardCharsets.UTF_8);
    }

    private String encodeComponent(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private String decodeComponent(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }

    private List<String> normalizeAuthorities(Collection<String> roles) {
        if (roles == null || roles.isEmpty()) {
            return List.of("ROLE_USER");
        }

        return roles.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .map(this::normalizeAuthority)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private List<String> extractRoles(String rolesValue) {
        if (rolesValue == null || rolesValue.isBlank()) {
            return List.of();
        }

        String[] parts = rolesValue.split(",");
        List<String> roles = new ArrayList<>();
        for (String part : parts) {
            if (!part.isBlank()) {
                roles.add(part.trim());
            }
        }
        return roles;
    }

    private String normalizeAuthority(String role) {
        String trimmed = role.trim();
        if (trimmed.isBlank()) {
            return "ROLE_USER";
        }
        return trimmed.startsWith("ROLE_") ? trimmed : "ROLE_" + trimmed.toUpperCase();
    }

    private String required(Map<String, String> payload, String key) {
        String value = payload.get(key);
        if (value == null || value.isBlank()) {
            throw new TokenValidationException("Missing claim: " + key);
        }
        return value;
    }

    private long parseLong(String value, String claimName) {
        if (value == null || value.isBlank()) {
            throw new TokenValidationException("Missing claim: " + claimName);
        }

        try {
            return Long.parseLong(value);
        } catch (NumberFormatException ex) {
            throw new TokenValidationException("Invalid numeric claim: " + claimName, ex);
        }
    }

    public static final class TokenValidationException extends RuntimeException {
        public TokenValidationException(String message) {
            super(message);
        }

        public TokenValidationException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public record TokenData(
            String subject,
            String jti,
            String issuer,
            Instant issuedAt,
            Instant expiresAt,
            List<String> roles,
            String tenant,
            String tokenType,
            Map<String, Object> claims
    ) {
    }
}