package com.reseau.painting.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;

@Entity
@Table(name = "roadmap")
public class Roadmap {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_roadmap;

    @Column(name = "titre", nullable = false)
    private String titre;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categorie")
    private CategoriePeinture categorie;

    public Roadmap() {}

    public Roadmap(String titre, String description, Utilisateur utilisateur, CategoriePeinture categorie) {
        this.titre = titre;
        this.description = description;
        this.utilisateur = utilisateur;
        this.categorie = categorie;
    }

    public Long getId_roadmap() { return id_roadmap; }
    public void setId_roadmap(Long id_roadmap) { this.id_roadmap = id_roadmap; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    public CategoriePeinture getCategorie() { return categorie; }
    public void setCategorie(CategoriePeinture categorie) { this.categorie = categorie; }
}
