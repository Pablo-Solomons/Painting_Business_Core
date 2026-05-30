package com.reseau.painting.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.Instant;

// MEDIA(id_media,	url, type,	taille, date_de_publication, #id_user, #id_fiche)

@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_media;

    @Column(name = "url", nullable = false)
    private String url;
    
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "taille", nullable = false)
    private Long taille;

    @Column(name = "date_de_publication", nullable = false)
    private Instant dateDePublication;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fiche")
    private FichePeinture fiche;

    public Media() {}

    public Media(String url, String type, Long taille, Instant dateDePublication, Utilisateur utilisateur, FichePeinture fiche) {
        this.url = url;
        this.type = type;
        this.taille = taille;
        this.dateDePublication = dateDePublication;
        this.utilisateur = utilisateur;
        this.fiche = fiche;
    }
    
    public Long getId_media() { return id_media; }
    public void setId_media(Long id_media) { this.id_media = id_media; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Long getTaille() { return taille; }
    public void setTaille(Long taille) { this.taille = taille; }
    public Instant getDateDePublication() { return dateDePublication; }
    public void setDateDePublication(Instant dateDePublication) { this.dateDePublication = dateDePublication; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    public FichePeinture getFiche() { return fiche; }
    public void setFiche(FichePeinture fiche) { this.fiche = fiche; }
}
