package com.reseau.painting.core;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.reseau.painting.painting.domain.Utilisateur;

@Service
public class JwtService {

    public String generateToken(Utilisateur utilisateur) {
        String rawToken = utilisateur.getEmail() + ":" + UUID.randomUUID();
        return Base64.getUrlEncoder().withoutPadding().encodeToString(rawToken.getBytes(StandardCharsets.UTF_8));
    }

    public String extractUsername(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }

        try {
            String decoded = new String(Base64.getUrlDecoder().decode(token), StandardCharsets.UTF_8);
            int separator = decoded.indexOf(':');
            return separator > 0 ? decoded.substring(0, separator) : decoded;
        } catch (IllegalArgumentException exception) {
            return null;
        }
    }

    public boolean isTokenValid(String token) {
        return extractUsername(token) != null;
    }
}