package com.reseau.painting.painting.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_tag;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "slug", nullable = false, unique = true)
    private String slug;

    public Tag() {}

    public Tag(String nom, String slug) {
        this.nom = nom;
        this.slug = slug;
    }

    public Long getId_tag() { return id_tag; }
    public void setId_tag(Long id_tag) { this.id_tag = id_tag; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
}
