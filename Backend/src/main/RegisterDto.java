package com.painting.auth.dto;

import jakarta.validation.constraints.*;

/**
 * DTO (Data Transfer Object) pour l'inscription d'un nouvel utilisateur.
 * Cette classe transporte uniquement les données nécessaires à l'inscription,
 * sans exposer les détails internes de l'entité en base de données.
 */
public class RegisterDto {

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    private String prenom;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    private String nom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'adresse email n'est pas valide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
        message = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
    )
    private String motDePasse;

    @NotBlank(message = "La confirmation du mot de passe est obligatoire")
    private String confirmationMotDePasse;

    @NotBlank(message = "Le rôle est obligatoire")
    @Pattern(
        regexp = "PEINTRE|CLIENT|GALERIE",
        message = "Le rôle doit être PEINTRE, CLIENT ou GALERIE"
    )
    private String role;

    // ─── Constructeurs ────────────────────────────────────────────────────────

    public RegisterDto() {}

    public RegisterDto(String prenom, String nom, String email,
                       String motDePasse, String confirmationMotDePasse, String role) {
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.confirmationMotDePasse = confirmationMotDePasse;
        this.role = role;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public String getConfirmationMotDePasse() { return confirmationMotDePasse; }
    public void setConfirmationMotDePasse(String confirmationMotDePasse) {
        this.confirmationMotDePasse = confirmationMotDePasse;
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}