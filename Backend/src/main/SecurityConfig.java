package com.painting.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration principale de Spring Security.
 *
 * On configure ici :
 * - Quels endpoints sont publics (inscription, connexion)
 * - Quels endpoints nécessitent d'être authentifié
 * - Le mode STATELESS (pas de session HTTP, on utilise JWT)
 * - Le filtre JWT qui vérifie le token à chaque requête
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Active les annotations @PreAuthorize dans les contrôleurs
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Désactivé car on utilise JWT (pas de session)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                // ── Endpoints publics (sans token) ────────────────────────
                .requestMatchers(
                    "/api/auth/**",     // inscription, connexion, validation
                    "/swagger-ui/**",   // documentation API
                    "/v3/api-docs/**"
                ).permitAll()
                // ── Tout le reste nécessite un token valide ───────────────
                .anyRequest().authenticated()
            )
            // On ajoute notre filtre JWT AVANT le filtre d'authentification standard
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Définit BCrypt comme algorithme de hachage des mots de passe.
     * BCrypt est lent par conception, ce qui le rend résistant aux attaques brute-force.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // 12 = facteur de coût (plus élevé = plus sécurisé)
    }
}