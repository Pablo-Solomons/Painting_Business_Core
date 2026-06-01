package com.reseau.painting.painting.entity;

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
@Table(name = "categorie_peinture")
public class CategoriePeinture {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_categorie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_parent")
    private CategoriePeinture parent;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    public CategoriePeinture() {}

    public CategoriePeinture(CategoriePeinture parent, String nom, String slug, String description) {
        this.parent = parent;
        this.nom = nom;
        this.slug = slug;
        this.description = description;
    }

    public Long getId_categorie() { return id_categorie; }
    public void setId_categorie(Long id_categorie) { this.id_categorie = id_categorie; }
    public CategoriePeinture getParent() { return parent; }
    public void setParent(CategoriePeinture parent) { this.parent = parent; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
