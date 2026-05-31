package com.reseau.painting.painting.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.Instant;

@Entity
@Table(name = "utilisateur")
public class Utilisateur {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_user;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "motdepasse", nullable = false)
    private String motdepasse;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "date_inscription")
    private Instant dateInscription;

    @Column(name = "addresse")
    private String addresse;

    public Utilisateur() {}

    public Utilisateur(String nom, String prenom, String email, String motdepasse, String role, Instant dateInscription, String addresse) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motdepasse = motdepasse;
        this.role = role;
        this.dateInscription = dateInscription;
        this.addresse = addresse;
    }

    public Long getId_user() { return id_user; }
    public void setId_user(Long id_user) { this.id_user = id_user; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMotdepasse() { return motdepasse; }
    public void setMotdepasse(String motdepasse) { this.motdepasse = motdepasse; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Instant getDateInscription() { return dateInscription; }
    public String getAddresse() { return addresse; }
    public void setAddresse(String addresse) { this.addresse = addresse; }
}
