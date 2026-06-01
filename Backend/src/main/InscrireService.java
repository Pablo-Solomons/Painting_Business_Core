package com.painting.auth.service;

import com.painting.auth.dto.AuthResponseDto;
import com.painting.auth.dto.RegisterDto;
import com.painting.auth.entity.RoleUtilisateur;
import com.painting.auth.entity.Utilisateur;
import com.painting.auth.security.JwtService;
import com.painting.auth.security.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Service gérant l'inscription de nouveaux utilisateurs.
 *
 * Ce service :
 * 1. Vérifie que l'email n'est pas déjà utilisé
 * 2. Vérifie que les mots de passe correspondent
 * 3. Hashe le mot de passe (bcrypt)
 * 4. Crée l'utilisateur en base de données
 * 5. Génère un token de validation par email
 * 6. Retourne un token JWT pour connexion immédiate
 */
@Service
@Transactional
public class InscrireService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;

    // Injection par constructeur (meilleure pratique que @Autowired)
    public InscrireService(UtilisateurRepository utilisateurRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder       = passwordEncoder;
        this.jwtService            = jwtService;
    }

    /**
     * Inscrit un nouvel utilisateur dans l'application.
     *
     * @param dto les données envoyées par le formulaire d'inscription
     * @return une réponse contenant le token JWT et les infos utilisateur
     * @throws IllegalArgumentException si l'email est déjà pris ou les mots de passe ne correspondent pas
     */
    public AuthResponseDto inscrire(RegisterDto dto) {

        // ── Règle 1 : email unique ─────────────────────────────────────────
        if (utilisateurRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException(
                "Cet email est déjà associé à un compte : " + dto.getEmail()
            );
        }

        // ── Règle 2 : mots de passe identiques ────────────────────────────
        if (!dto.getMotDePasse().equals(dto.getConfirmationMotDePasse())) {
            throw new IllegalArgumentException(
                "Les mots de passe ne correspondent pas"
            );
        }

        // ── Création de l'utilisateur ─────────────────────────────────────
        Utilisateur utilisateur = new Utilisateur(
            dto.getPrenom(),
            dto.getNom(),
            dto.getEmail(),
            passwordEncoder.encode(dto.getMotDePasse()), // hash bcrypt
            RoleUtilisateur.valueOf(dto.getRole())
        );

        // Token de validation envoyé par email (UUID unique et non devinable)
        utilisateur.setTokenValidation(UUID.randomUUID().toString());

        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);

        // TODO (S3) : envoyer l'email de validation via un EmailService

        // ── Génération du JWT ─────────────────────────────────────────────
        String token = jwtService.genererToken(
            sauvegarde.getEmail(),
            sauvegarde.getRole().name()
        );

        return new AuthResponseDto(
            token,
            sauvegarde.getId(),
            sauvegarde.getEmail(),
            sauvegarde.getNomComplet(),
            sauvegarde.getRole().name(),
            sauvegarde.isCompteValide()
        );
    }
}