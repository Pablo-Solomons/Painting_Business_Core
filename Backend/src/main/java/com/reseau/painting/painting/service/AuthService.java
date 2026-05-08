package com.reseau.painting.painting.service;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reseau.painting.core.JwtService;
import com.reseau.painting.painting.domain.Utilisateur;

@Service
public class AuthService {

    private final Map<String, Utilisateur> utilisateurs = new LinkedHashMap<>();
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Utilisateur register(String email, String motDePasse) {
        if (email == null || email.isBlank() || motDePasse == null || motDePasse.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email et mot de passe obligatoires");
        }

        if (utilisateurs.containsKey(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Utilisateur déjà existant");
        }

        Utilisateur utilisateur = new Utilisateur(
                UUID.randomUUID(),
                email,
                passwordEncoder.encode(motDePasse),
                "USER");
        utilisateurs.put(email, utilisateur);
        return utilisateur;
    }

    public String login(String email, String motDePasse) {
        Utilisateur utilisateur = utilisateurs.get(email);
        if (utilisateur == null || !passwordEncoder.matches(motDePasse, utilisateur.getMotDePasse())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Identifiants invalides");
        }

        return jwtService.generateToken(utilisateur);
    }

    public Collection<Utilisateur> findAll() {
        return utilisateurs.values();
    }
}