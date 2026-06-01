package com.painting.auth.controller;

import com.painting.auth.entity.Utilisateur;
import com.painting.auth.security.UtilisateurRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST gérant les acteurs (utilisateurs) de l'application.
 *
 * Ce contrôleur expose des endpoints protégés par rôle :
 * - Un PEINTRE peut voir son profil
 * - Un CLIENT peut voir la liste des peintres
 * - Un ADMIN peut gérer tous les utilisateurs
 *
 * Base URL : /api/acteurs
 *
 * L'annotation @PreAuthorize vérifie le rôle AVANT d'exécuter la méthode.
 */
@RestController
@RequestMapping("/api/acteurs")
public class ActorController {

    private final UtilisateurRepository utilisateurRepository;

    public ActorController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/acteurs/moi  — Profil de l'utilisateur connecté
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Retourne le profil de l'utilisateur actuellement connecté.
     * Authentication est injecté automatiquement par Spring Security.
     */
    @GetMapping("/moi")
    public ResponseEntity<?> monProfil(Authentication authentication) {
        String email = authentication.getName(); // email stocké dans le JWT

        return utilisateurRepository.findByEmail(email)
            .<ResponseEntity<?>>map(u -> ResponseEntity.ok(
                Map.of(
                    "id",           u.getId(),
                    "nomComplet",   u.getNomComplet(),
                    "email",        u.getEmail(),
                    "role",         u.getRole().name(),
                    "compteValide", u.isCompteValide(),
                    "dateCreation", u.getDateCreation().toString()
                )
            ))
            .orElse(ResponseEntity.notFound().build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/acteurs/peintres  — Liste publique des peintres
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Retourne la liste de tous les peintres de la plateforme.
     * Accessible à tous les utilisateurs authentifiés.
     */
    @GetMapping("/peintres")
    public ResponseEntity<List<Map<String, Object>>> listerPeintres() {
        List<Map<String, Object>> peintres = utilisateurRepository.findAll()
            .stream()
            .filter(u -> u.getRole().name().equals("PEINTRE"))
            .filter(Utilisateur::isCompteValide)
            .map(u -> Map.<String, Object>of(
                "id",         u.getId(),
                "nomComplet", u.getNomComplet(),
                "email",      u.getEmail()
            ))
            .toList();

        return ResponseEntity.ok(peintres);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/acteurs  — Liste de tous les utilisateurs (ADMIN uniquement)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Liste tous les utilisateurs. Réservé à l'administrateur.
     *
     * @PreAuthorize("hasRole('ADMIN')") bloque la requête si l'utilisateur
     * n'a pas le rôle ADMIN, et retourne 403 Forbidden.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> listerTousLesActeurs() {
        List<Map<String, Object>> acteurs = utilisateurRepository.findAll()
            .stream()
            .map(u -> Map.<String, Object>of(
                "id",           u.getId(),
                "nomComplet",   u.getNomComplet(),
                "email",        u.getEmail(),
                "role",         u.getRole().name(),
                "compteValide", u.isCompteValide(),
                "compteActif",  u.isCompteActif()
            ))
            .toList();

        return ResponseEntity.ok(acteurs);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PATCH /api/acteurs/{id}/desactiver  — Désactiver un compte (ADMIN)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Désactive le compte d'un utilisateur (bannissement soft).
     */
    @PatchMapping("/{id}/desactiver")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> desactiverCompte(@PathVariable Long id) {
        return utilisateurRepository.findById(id)
            .<ResponseEntity<?>>map(u -> {
                u.setCompteActif(false);
                utilisateurRepository.save(u);
                return ResponseEntity.ok(
                    Map.of("message", "Compte de " + u.getNomComplet() + " désactivé")
                );
            })
            .orElse(ResponseEntity.notFound().build());
    }
}