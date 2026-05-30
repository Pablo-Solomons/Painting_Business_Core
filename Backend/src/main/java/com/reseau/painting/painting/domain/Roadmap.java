package com.reseau.painting.painting.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Roadmap {

    private UUID id;
    private String titre;
    private String description;
    private List<FichePeinture> fiches = new ArrayList<>();

    public Roadmap() {
    }

    public Roadmap(UUID id, String titre, String description, List<FichePeinture> fiches) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.fiches = fiches != null ? fiches : new ArrayList<>();
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

    public List<FichePeinture> getFiches() {
        return fiches;
    }

    public void setFiches(List<FichePeinture> fiches) {
        this.fiches = fiches != null ? fiches : new ArrayList<>();
    }
}