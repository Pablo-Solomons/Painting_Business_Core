package com.reseau.painting.painting.entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class FicheTag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_fiche_tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fiche")
    private FichePeinture fiche;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tag")
    private Tag tag;

    public FicheTag() {}

    public FicheTag(FichePeinture fiche, Tag tag) {
        this.fiche = fiche;
        this.tag = tag;
    }

    public Long getId_fiche_tag() { return id_fiche_tag; }
    public FichePeinture getFiche() { return fiche; }
    public Tag getTag() { return tag; }
}
