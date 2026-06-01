package com.painting.auth.dto;

/**
 * DTO de réponse après une authentification réussie.
 * Contient le token JWT et les informations essentielles de l'utilisateur.
 * Ce DTO est envoyé au client (front-end) après une connexion ou inscription.
 */
public class AuthResponseDto {

    private String token;
    private String type = "Bearer"; // Type standard des tokens JWT
    private Long   utilisateurId;
    private String email;
    private String nomComplet;
    private String role;
    private boolean compteValide;

    // ─── Constructeurs ────────────────────────────────────────────────────────

    public AuthResponseDto() {}

    public AuthResponseDto(String token, Long utilisateurId, String email,
                           String nomComplet, String role, boolean compteValide) {
        this.token          = token;
        this.utilisateurId  = utilisateurId;
        this.email          = email;
        this.nomComplet     = nomComplet;
        this.role           = role;
        this.compteValide   = compteValide;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(Long utilisateurId) { this.utilisateurId = utilisateurId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNomComplet() { return nomComplet; }
    public void setNomComplet(String nomComplet) { this.nomComplet = nomComplet; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isCompteValide() { return compteValide; }
    public void setCompteValide(boolean compteValide) { this.compteValide = compteValide; }
}