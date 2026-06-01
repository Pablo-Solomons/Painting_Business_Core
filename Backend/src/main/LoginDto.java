package com.painting.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour la connexion d'un utilisateur existant.
 * Seuls l'email et le mot de passe sont nécessaires pour s'authentifier.
 */
public class LoginDto {

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'adresse email n'est pas valide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String motDePasse;

    // ─── Constructeurs ────────────────────────────────────────────────────────

    public LoginDto() {}

    public LoginDto(String email, String motDePasse) {
        this.email = email;
        this.motDePasse = motDePasse;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
}