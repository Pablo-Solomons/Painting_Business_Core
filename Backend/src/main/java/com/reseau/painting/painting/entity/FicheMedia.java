package com.reseau.painting.painting.entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class FicheMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_fiche_media;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_media")
    private Media media;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fiche")
    private FichePeinture fiche;

    public FicheMedia() {}

    public FicheMedia(Media media, FichePeinture fiche) {
        this.media = media;
        this.fiche = fiche;
    }

    public Long getId_fiche_media() { return id_fiche_media; }
    public Media getMedia() { return media; }
    public FichePeinture getFiche() { return fiche; }
}
