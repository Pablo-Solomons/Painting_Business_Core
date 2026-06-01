package com.painting.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.painting.auth.dto.AuthResponseDto;
import com.painting.auth.dto.LoginDto;
import com.painting.auth.dto.RegisterDto;
import com.painting.auth.service.ConnecterService;
import com.painting.auth.service.InscrireService;
import com.painting.auth.service.ValiderCompteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests unitaires du AuthController.
 *
 * @WebMvcTest : charge uniquement la couche web (contrôleur), pas la BDD.
 * Les services sont "mockés" (simulés) avec @MockBean.
 *
 * On teste ici que le contrôleur :
 * - Accepte les bonnes requêtes
 * - Retourne les bons codes HTTP
 * - Gère correctement les erreurs
 */
@WebMvcTest(controllers = com.painting.auth.controller.AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc; // Simule des requêtes HTTP sans démarrer un vrai serveur

    @Autowired
    private ObjectMapper objectMapper; // Convertit les objets Java en JSON

    @MockBean
    private InscrireService inscrireService;

    @MockBean
    private ConnecterService connecterService;

    @MockBean
    private ValiderCompteService validerCompteService;

    // ─────────────────────────────────────────────────────────────────────────
    // Tests d'inscription
    // ─────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Inscription réussie → 201 Created avec token JWT")
    void inscription_succes_retourne_201() throws Exception {
        // GIVEN : un DTO d'inscription valide
        RegisterDto dto = new RegisterDto(
            "Jean", "Dupont",
            "jean.dupont@email.com",
            "MotDePasse1!", "MotDePasse1!",
            "PEINTRE"
        );

        AuthResponseDto reponseAttendue = new AuthResponseDto(
            "token.jwt.fake", 1L,
            "jean.dupont@email.com", "Jean Dupont",
            "PEINTRE", false
        );

        // WHEN : le service retourne une réponse simulée
        when(inscrireService.inscrire(any(RegisterDto.class)))
            .thenReturn(reponseAttendue);

        // THEN : la requête POST /api/auth/inscription doit retourner 201
        mockMvc.perform(
            post("/api/auth/inscription")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.token").value("token.jwt.fake"))
        .andExpect(jsonPath("$.email").value("jean.dupont@email.com"))
        .andExpect(jsonPath("$.role").value("PEINTRE"));
    }

    @Test
    @DisplayName("Inscription avec email existant → 400 Bad Request")
    void inscription_email_existant_retourne_400() throws Exception {
        RegisterDto dto = new RegisterDto(
            "Jean", "Dupont",
            "existant@email.com",
            "MotDePasse1!", "MotDePasse1!",
            "CLIENT"
        );

        // WHEN : le service lance une exception (email déjà pris)
        when(inscrireService.inscrire(any()))
            .thenThrow(new IllegalArgumentException("Cet email est déjà associé à un compte"));

        mockMvc.perform(
            post("/api/auth/inscription")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto))
        )
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.erreur").exists());
    }

    @Test
    @DisplayName("Inscription avec email invalide → 400 (Bean Validation)")
    void inscription_email_invalide_retourne_400() throws Exception {
        RegisterDto dto = new RegisterDto(
            "Jean", "Dupont",
            "email-invalide", // pas un email valide
            "MotDePasse1!", "MotDePasse1!",
            "CLIENT"
        );

        mockMvc.perform(
            post("/api/auth/inscription")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto))
        )
        .andExpect(status().isBadRequest());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Tests de connexion
    // ─────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Connexion réussie → 200 OK avec token JWT")
    void connexion_succes_retourne_200() throws Exception {
        LoginDto dto = new LoginDto("jean.dupont@email.com", "MotDePasse1!");

        AuthResponseDto reponseAttendue = new AuthResponseDto(
            "token.jwt.valide", 1L,
            "jean.dupont@email.com", "Jean Dupont",
            "PEINTRE", true
        );

        when(connecterService.connecter(any(LoginDto.class)))
            .thenReturn(reponseAttendue);

        mockMvc.perform(
            post("/api/auth/connexion")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("token.jwt.valide"))
        .andExpect(jsonPath("$.type").value("Bearer"));
    }

    @Test
    @DisplayName("Connexion avec mauvais mot de passe → 401 Unauthorized")
    void connexion_mauvais_mdp_retourne_401() throws Exception {
        LoginDto dto = new LoginDto("jean.dupont@email.com", "mauvaisMdp");

        when(connecterService.connecter(any()))
            .thenThrow(new IllegalArgumentException("Email ou mot de passe incorrect"));

        mockMvc.perform(
            post("/api/auth/connexion")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto))
        )
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.erreur").value("Email ou mot de passe incorrect"));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Tests de validation de compte
    // ─────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Validation de compte avec token valide → 200 OK")
    void validerCompte_token_valide_retourne_200() throws Exception {
        doNothing().when(validerCompteService).validerCompte("token-valide-123");

        mockMvc.perform(get("/api/auth/valider").param("token", "token-valide-123"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("Validation avec token invalide → 400 Bad Request")
    void validerCompte_token_invalide_retourne_400() throws Exception {
        doThrow(new IllegalArgumentException("Token invalide"))
            .when(validerCompteService).validerCompte("bad-token");

        mockMvc.perform(get("/api/auth/valider").param("token", "bad-token"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.erreur").value("Token invalide"));
    }
}