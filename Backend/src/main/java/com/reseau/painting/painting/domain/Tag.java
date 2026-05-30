package com.reseau.painting.painting.domain;

import java.util.UUID;

public class Tag {

    private UUID id;
    private String nom;

    public Tag() {
    }

    public Tag(UUID id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}