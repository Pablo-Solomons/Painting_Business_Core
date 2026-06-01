package com.painting.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

/**
 * Service responsable de la création et de la validation des tokens JWT.
 *
 * JWT (JSON Web Token) = un token signé qui contient des informations sur
 * l'utilisateur. Le serveur le génère à la connexion, le client le renvoie
 * à chaque requête pour prouver son identité.
 *
 * Structure d'un JWT : HEADER.PAYLOAD.SIGNATURE
 */
@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    /**
     * Génère un token JWT pour un utilisateur authentifié.
     *
     * @param email  l'identifiant unique de l'utilisateur
     * @param role   le rôle (PEINTRE, CLIENT, etc.)
     * @return le token JWT signé sous forme de String
     */
    public String genererToken(String email, String role) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()
                .setSubject(email)               // "sub" : identifiant principal
                .claim("role", role)             // donnée personnalisée dans le payload
                .setIssuedAt(new Date())         // "iat" : date d'émission
                .setExpiration(                  // "exp" : date d'expiration
                    new Date(System.currentTimeMillis() + expirationMs)
                )
                .signWith(key, SignatureAlgorithm.HS256) // signature HMAC SHA-256
                .compact();
    }

    /**
     * Extrait l'email (subject) d'un token JWT.
     */
    public String extraireEmail(String token) {
        return extraireClaims(token).getSubject();
    }

    /**
     * Extrait le rôle d'un token JWT.
     */
    public String extraireRole(String token) {
        return extraireClaims(token).get("role", String.class);
    }

    /**
     * Vérifie si un token est encore valide (non expiré, signature correcte).
     */
    public boolean estValide(String token) {
        try {
            extraireClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // ─── Méthode privée ───────────────────────────────────────────────────────

    private Claims extraireClaims(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}