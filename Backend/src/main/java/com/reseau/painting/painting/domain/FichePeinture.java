package com.reseau.painting.painting.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class FichePeinture {

    private UUID id;
    private String titre;
    private String description;
    private Categorie categorie;
    private List<Tag> tags = new ArrayList<>();

    public FichePeinture() {
    }

    public FichePeinture(UUID id, String titre, String description, Categorie categorie, List<Tag> tags) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.categorie = categorie;
        this.tags = tags != null ? tags : new ArrayList<>();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags != null ? tags : new ArrayList<>();
    }
}