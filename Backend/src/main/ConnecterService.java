package com.painting.auth.service;

import com.painting.auth.dto.AuthResponseDto;
import com.painting.auth.dto.LoginDto;
import com.painting.auth.entity.Utilisateur;
import com.painting.auth.security.JwtService;
import com.painting.auth.security.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service gérant la connexion (authentification) des utilisateurs existants.
 *
 * Ce service :
 * 1. Cherche l'utilisateur par email
 * 2. Compare le mot de passe entré avec le hash en base (bcrypt)
 * 3. Vérifie que le compte est actif
 * 4. Génère et retourne un token JWT
 */
@Service
public class ConnecterService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;

    public ConnecterService(UtilisateurRepository utilisateurRepository,
                            PasswordEncoder passwordEncoder,
                            JwtService jwtService) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder       = passwordEncoder;
        this.jwtService            = jwtService;
    }

    /**
     * Authentifie un utilisateur avec son email et mot de passe.
     *
     * @param dto les identifiants de connexion
     * @return la réponse avec le token JWT si succès
     * @throws IllegalArgumentException si les identifiants sont invalides
     */
    public AuthResponseDto connecter(LoginDto dto) {

        // ── Étape 1 : trouver l'utilisateur par email ─────────────────────
        Utilisateur utilisateur = utilisateurRepository
            .findByEmail(dto.getEmail())
            .orElseThrow(() -> new IllegalArgumentException(
                "Email ou mot de passe incorrect" // Message volontairement vague (sécurité)
            ));

        // ── Étape 2 : vérifier le mot de passe ────────────────────────────
        // passwordEncoder.matches() compare le texte clair avec le hash bcrypt
        if (!passwordEncoder.matches(dto.getMotDePasse(), utilisateur.getMotDePasse())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        // ── Étape 3 : vérifier que le compte est actif ────────────────────
        if (!utilisateur.isCompteActif()) {
            throw new IllegalArgumentException(
                "Ce compte a été désactivé. Contactez l'administrateur."
            );
        }

        // ── Étape 4 : générer le token JWT ────────────────────────────────
        String token = jwtService.genererToken(
            utilisateur.getEmail(),
            utilisateur.getRole().name()
        );

        return new AuthResponseDto(
            token,
            utilisateur.getId(),
            utilisateur.getEmail(),
            utilisateur.getNomComplet(),
            utilisateur.getRole().name(),
            utilisateur.isCompteValide()
        );
    }
}