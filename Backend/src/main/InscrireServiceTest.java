package com.painting.auth;

import com.painting.auth.dto.AuthResponseDto;
import com.painting.auth.dto.RegisterDto;
import com.painting.auth.entity.RoleUtilisateur;
import com.painting.auth.entity.Utilisateur;
import com.painting.auth.security.JwtService;
import com.painting.auth.security.UtilisateurRepository;
import com.painting.auth.service.InscrireService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires du InscrireService.
 *
 * @ExtendWith(MockitoExtension.class) : active Mockito pour simuler les dépendances.
 * On teste la logique métier sans base de données réelle.
 */
@ExtendWith(MockitoExtension.class)
class InscrireServiceTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks // Crée une instance de InscrireService avec les mocks injectés
    private InscrireService inscrireService;

    private RegisterDto dtoValide;

    @BeforeEach
    void setUp() {
        dtoValide = new RegisterDto(
            "Marie", "Curie",
            "marie.curie@painting.fr",
            "Peinture1!", "Peinture1!",
            "PEINTRE"
        );
    }

    @Test
    @DisplayName("Inscription valide → utilisateur sauvegardé + token retourné")
    void inscrire_donnees_valides_sauvegarde_utilisateur() {
        // GIVEN
        when(utilisateurRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("$2b$12$hashedPassword");

        Utilisateur utilisateurSauvegarde = new Utilisateur(
            "Marie", "Curie",
            "marie.curie@painting.fr",
            "$2b$12$hashedPassword",
            RoleUtilisateur.PEINTRE
        );
        // Simuler l'ID généré par la BDD
        when(utilisateurRepository.save(any(Utilisateur.class)))
            .thenReturn(utilisateurSauvegarde);
        when(jwtService.genererToken(anyString(), anyString()))
            .thenReturn("jwt.token.genere");

        // WHEN
        AuthResponseDto resultat = inscrireService.inscrire(dtoValide);

        // THEN
        assertThat(resultat).isNotNull();
        assertThat(resultat.getToken()).isEqualTo("jwt.token.genere");
        assertThat(resultat.getEmail()).isEqualTo("marie.curie@painting.fr");
        assertThat(resultat.getRole()).isEqualTo("PEINTRE");

        // Vérifier que save() a bien été appelé une fois
        verify(utilisateurRepository, times(1)).save(any(Utilisateur.class));
    }

    @Test
    @DisplayName("Email déjà utilisé → IllegalArgumentException")
    void inscrire_email_existant_lance_exception() {
        // GIVEN : l'email existe déjà
        when(utilisateurRepository.existsByEmail("marie.curie@painting.fr"))
            .thenReturn(true);

        // WHEN & THEN : on s'attend à une exception
        assertThatThrownBy(() -> inscrireService.inscrire(dtoValide))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("déjà associé à un compte");

        // Vérifier que save() n'a JAMAIS été appelé
        verify(utilisateurRepository, never()).save(any());
    }

    @Test
    @DisplayName("Mots de passe différents → IllegalArgumentException")
    void inscrire_mdp_differents_lance_exception() {
        // GIVEN : mot de passe et confirmation différents
        dtoValide.setConfirmationMotDePasse("AutreMdp1!");
        when(utilisateurRepository.existsByEmail(anyString())).thenReturn(false);

        // WHEN & THEN
        assertThatThrownBy(() -> inscrireService.inscrire(dtoValide))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("ne correspondent pas");

        verify(utilisateurRepository, never()).save(any());
    }

    @Test
    @DisplayName("Mot de passe hashé avec bcrypt (jamais stocké en clair)")
    void inscrire_motDePasse_est_hashe() {
        when(utilisateurRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode("Peinture1!")).thenReturn("$2b$12$HASH");

        Utilisateur sauvegarde = new Utilisateur(
            "Marie", "Curie", "marie.curie@painting.fr",
            "$2b$12$HASH", RoleUtilisateur.PEINTRE
        );
        when(utilisateurRepository.save(any())).thenReturn(sauvegarde);
        when(jwtService.genererToken(any(), any())).thenReturn("token");

        inscrireService.inscrire(dtoValide);

        // Vérifier que encode() a été appelé avec le mot de passe en clair
        verify(passwordEncoder, times(1)).encode("Peinture1!");
    }
}