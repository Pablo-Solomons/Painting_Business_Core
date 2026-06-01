package com.painting.auth.config;

import com.painting.auth.security.JwtService;
import com.painting.auth.security.UtilisateurRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Filtre HTTP qui s'exécute UNE FOIS par requête pour vérifier le token JWT.
 *
 * Fonctionnement :
 * 1. Extrait l'en-tête "Authorization: Bearer <token>"
 * 2. Valide le token JWT
 * 3. Si valide, charge l'utilisateur et l'ajoute au SecurityContext
 * 4. Spring Security sait alors qui fait la requête
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService            jwtService;
    private final UtilisateurRepository utilisateurRepository;

    public JwtAuthFilter(JwtService jwtService,
                         UtilisateurRepository utilisateurRepository) {
        this.jwtService            = jwtService;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest  request,
                                    HttpServletResponse response,
                                    FilterChain         filterChain)
            throws ServletException, IOException {

        // ── Étape 1 : lire l'en-tête Authorization ────────────────────────
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Pas de token → on continue sans authentifier (pour les endpoints publics)
            filterChain.doFilter(request, response);
            return;
        }

        // ── Étape 2 : extraire le token (enlever "Bearer ") ───────────────
        String token = authHeader.substring(7);

        // ── Étape 3 : valider le token ────────────────────────────────────
        if (!jwtService.estValide(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        // ── Étape 4 : extraire les infos du token ─────────────────────────
        String email = jwtService.extraireEmail(token);
        String role  = jwtService.extraireRole(token);

        // ── Étape 5 : créer l'objet d'authentification Spring Security ────
        // "ROLE_" est un préfixe requis par Spring Security pour les rôles
        var authentication = new UsernamePasswordAuthenticationToken(
            email,
            null, // pas de mot de passe (déjà vérifié via JWT)
            List.of(new SimpleGrantedAuthority("ROLE_" + role))
        );

        // ── Étape 6 : enregistrer dans le contexte de sécurité ────────────
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}