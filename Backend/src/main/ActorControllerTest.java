package com.painting.auth;

import com.painting.auth.entity.RoleUtilisateur;
import com.painting.auth.entity.Utilisateur;
import com.painting.auth.security.UtilisateurRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests unitaires de l'ActorController.
 *
 * @WithMockUser : simule un utilisateur connecté avec le rôle spécifié.
 * Sans cela, Spring Security bloquerait toutes les requêtes (401).
 */
@WebMvcTest(controllers = com.painting.auth.controller.ActorController.class)
class ActorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UtilisateurRepository utilisateurRepository;

    @Test
    @DisplayName("GET /api/acteurs/moi → retourne le profil de l'utilisateur connecté")
    @WithMockUser(username = "jean@painting.fr", roles = "PEINTRE")
    void monProfil_utilisateur_connecte_retourne_profil() throws Exception {
        Utilisateur u = new Utilisateur(
            "Jean", "Peintre",
            "jean@painting.fr",
            "hashedPwd", RoleUtilisateur.PEINTRE
        );
        u.setCompteValide(true);

        when(utilisateurRepository.findByEmail("jean@painting.fr"))
            .thenReturn(Optional.of(u));

        mockMvc.perform(get("/api/acteurs/moi"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.email").value("jean@painting.fr"))
            .andExpect(jsonPath("$.nomComplet").value("Jean Peintre"))
            .andExpect(jsonPath("$.role").value("PEINTRE"));
    }

    @Test
    @DisplayName("GET /api/acteurs/peintres → liste les peintres validés")
    @WithMockUser(roles = "CLIENT")
    void listerPeintres_retourne_liste_peintres_valides() throws Exception {
        Utilisateur peintre1 = new Utilisateur(
            "Pablo", "Pinceaux", "pablo@art.fr",
            "hash", RoleUtilisateur.PEINTRE
        );
        peintre1.setCompteValide(true);

        Utilisateur client = new Utilisateur(
            "Bob", "Client", "bob@mail.fr",
            "hash", RoleUtilisateur.CLIENT
        );
        client.setCompteValide(true);

        when(utilisateurRepository.findAll())
            .thenReturn(List.of(peintre1, client));

        mockMvc.perform(get("/api/acteurs/peintres"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].nomComplet").value("Pablo Pinceaux"));
    }

    @Test
    @DisplayName("GET /api/acteurs sans rôle ADMIN → 403 Forbidden")
    @WithMockUser(roles = "PEINTRE") // rôle insuffisant
    void listerTousLesActeurs_sans_admin_retourne_403() throws Exception {
        mockMvc.perform(get("/api/acteurs"))
            .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("GET /api/acteurs avec rôle ADMIN → 200 OK")
    @WithMockUser(roles = "ADMIN")
    void listerTousLesActeurs_avec_admin_retourne_200() throws Exception {
        when(utilisateurRepository.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/acteurs"))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Accès sans token → 401 Unauthorized")
    void accesSansToken_retourne_401() throws Exception {
        // Aucun @WithMockUser ici → pas d'utilisateur simulé
        mockMvc.perform(get("/api/acteurs/moi"))
            .andExpect(status().isUnauthorized());
    }
}