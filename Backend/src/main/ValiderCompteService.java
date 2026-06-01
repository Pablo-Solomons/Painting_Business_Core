package com.painting.auth.service;

import com.painting.auth.entity.Utilisateur;
import com.painting.auth.security.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Service de validation de compte par email.
 *
 * Flux complet :
 * 1. L'utilisateur s'inscrit → un token UUID est généré et enregistré
 * 2. Un email lui est envoyé avec un lien contenant ce token
 * 3. Il clique sur le lien → ce service valide son compte
 * 4. compteValide passe à true → il peut utiliser toutes les fonctionnalités
 */
@Service
@Transactional
public class ValiderCompteService {

    private final UtilisateurRepository utilisateurRepository;

    public ValiderCompteService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    /**
     * Valide le compte d'un utilisateur via son token de validation.
     *
     * @param token le token UUID reçu par email
     * @throws IllegalArgumentException si le token est invalide ou le compte déjà validé
     */
    public void validerCompte(String token) {

        // ── Trouver l'utilisateur par son token ───────────────────────────
        Utilisateur utilisateur = utilisateurRepository
            .findByTokenValidation(token)
            .orElseThrow(() -> new IllegalArgumentException(
                "Token de validation invalide ou expiré"
            ));

        // ── Vérifier que le compte n'est pas déjà validé ──────────────────
        if (utilisateur.isCompteValide()) {
            throw new IllegalArgumentException(
                "Ce compte est déjà validé"
            );
        }

        // ── Valider le compte ─────────────────────────────────────────────
        utilisateur.setCompteValide(true);
        utilisateur.setDateValidation(LocalDateTime.now());
        utilisateur.setTokenValidation(null); // On efface le token après usage

        utilisateurRepository.save(utilisateur);
    }

    /**
     * Renvoie un nouveau token de validation à un utilisateur non encore validé.
     *
     * @param email l'email de l'utilisateur
     */
    public void renvoyerTokenValidation(String email) {
        Utilisateur utilisateur = utilisateurRepository
            .findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException(
                "Aucun compte trouvé avec cet email"
            ));

        if (utilisateur.isCompteValide()) {
            throw new IllegalArgumentException("Ce compte est déjà validé");
        }

        utilisateur.setTokenValidation(java.util.UUID.randomUUID().toString());
        utilisateurRepository.save(utilisateur);

        // TODO : renvoyer l'email via EmailService
    }
}