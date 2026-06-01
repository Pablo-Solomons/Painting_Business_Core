package com.painting.auth.controller;

import com.painting.auth.dto.AuthResponseDto;
import com.painting.auth.dto.LoginDto;
import com.painting.auth.dto.RegisterDto;
import com.painting.auth.service.ConnecterService;
import com.painting.auth.service.InscrireService;
import com.painting.auth.service.ValiderCompteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Contrôleur REST exposant les endpoints d'authentification.
 *
 * Les contrôleurs sont la "porte d'entrée" de l'application :
 * ils reçoivent les requêtes HTTP, délèguent la logique aux services,
 * puis retournent une réponse HTTP avec le bon code de statut.
 *
 * Base URL : /api/auth
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // À restreindre en production
public class AuthController {

    private final InscrireService      inscrireService;
    private final ConnecterService     connecterService;
    private final ValiderCompteService validerCompteService;

    public AuthController(InscrireService inscrireService,
                          ConnecterService connecterService,
                          ValiderCompteService validerCompteService) {
        this.inscrireService      = inscrireService;
        this.connecterService     = connecterService;
        this.validerCompteService = validerCompteService;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/auth/inscription
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Inscription d'un nouvel utilisateur.
     *
     * @Valid déclenche automatiquement la validation Bean Validation (annotations
     * sur RegisterDto). Si une contrainte est violée, Spring retourne 400 Bad Request.
     *
     * @param dto les données du formulaire d'inscription
     * @return 201 Created + token JWT en cas de succès
     */
    @PostMapping("/inscription")
    public ResponseEntity<?> inscription(@Valid @RequestBody RegisterDto dto) {
        try {
            AuthResponseDto reponse = inscrireService.inscrire(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("erreur", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/auth/connexion
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Connexion d'un utilisateur existant.
     *
     * @param dto email + mot de passe
     * @return 200 OK + token JWT en cas de succès
     */
    @PostMapping("/connexion")
    public ResponseEntity<?> connexion(@Valid @RequestBody LoginDto dto) {
        try {
            AuthResponseDto reponse = connecterService.connecter(dto);
            return ResponseEntity.ok(reponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("erreur", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/auth/valider?token=xxxxx
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Validation du compte via le lien reçu par email.
     *
     * @param token le token UUID envoyé par email
     * @return 200 OK si le compte est validé avec succès
     */
    @GetMapping("/valider")
    public ResponseEntity<?> validerCompte(@RequestParam String token) {
        try {
            validerCompteService.validerCompte(token);
            return ResponseEntity.ok(
                Map.of("message", "Votre compte a été validé avec succès ! Vous pouvez maintenant vous connecter.")
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("erreur", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/auth/renvoyer-validation
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Renvoie l'email de validation si l'utilisateur ne l'a pas reçu.
     *
     * @param body JSON contenant {"email": "..."}
     */
    @PostMapping("/renvoyer-validation")
    public ResponseEntity<?> renvoyerValidation(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            validerCompteService.renvoyerTokenValidation(email);
            return ResponseEntity.ok(
                Map.of("message", "Email de validation renvoyé à : " + email)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("erreur", e.getMessage()));
        }
    }
}