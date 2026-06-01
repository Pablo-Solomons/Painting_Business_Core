package com.painting.auth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entité JPA représentant un utilisateur en base de données (table "utilisateurs").
 * Cette classe est mappée directement sur une table PostgreSQL.
 */
@Entity
@Table(name = "utilisateurs",
       uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String prenom;

    @Column(nullable = false, length = 50)
    private String nom;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String motDePasse; // Stocké hashé (bcrypt)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RoleUtilisateur role;

    @Column(nullable = false)
    private boolean compteValide = false; // Faux jusqu'à validation par email

    @Column(nullable = false)
    private boolean compteActif = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @Column
    private LocalDateTime dateValidation;

    @Column(length = 255)
    private String tokenValidation; // Token envoyé par email pour valider le compte

    // ─── Callbacks JPA ───────────────────────────────────────────────────────

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
    }

    // ─── Constructeurs ────────────────────────────────────────────────────────

    public Utilisateur() {}

    public Utilisateur(String prenom, String nom, String email,
                       String motDePasse, RoleUtilisateur role) {
        this.prenom     = prenom;
        this.nom        = nom;
        this.email      = email;
        this.motDePasse = motDePasse;
        this.role       = role;
    }

    // ─── Méthode utilitaire ───────────────────────────────────────────────────

    public String getNomComplet() {
        return prenom + " " + nom;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public RoleUtilisateur getRole() { return role; }
    public void setRole(RoleUtilisateur role) { this.role = role; }

    public boolean isCompteValide() { return compteValide; }
    public void setCompteValide(boolean compteValide) { this.compteValide = compteValide; }

    public boolean isCompteActif() { return compteActif; }
    public void setCompteActif(boolean compteActif) { this.compteActif = compteActif; }

    public LocalDateTime getDateCreation() { return dateCreation; }

    public LocalDateTime getDateValidation() { return dateValidation; }
    public void setDateValidation(LocalDateTime dateValidation) { this.dateValidation = dateValidation; }

    public String getTokenValidation() { return tokenValidation; }
    public void setTokenValidation(String tokenValidation) { this.tokenValidation = tokenValidation; }
}