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
import java.time.Instant;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "fiche_peinture")
public class FichePeinture {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_fiche;

    @Column(name = "titre", nullable = false)
    private String titre;

    @Column(name = "resume", columnDefinition = "TEXT")
    private String resume;

    @Column(name = "niveau")
    private String niveau;

    @Column(name = "statut")
    private String statut;

    @Column(name = "date_publication")
    private Instant datePublication;

    @Column(name = "date_modification")
    private Instant dateModification;

    @Column(name = "nombres_de_vues")
    private Integer nombresDeVues = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categorie")
    private CategoriePeinture categorie;

    private Set<FichePeinture> fichesLiees = new HashSet<>();

    public FichePeinture() {}


    public FichePeinture(String titre, String resume, String niveau, String statut, Instant datePublication, CategoriePeinture categorie) {
        this.titre = titre;
        this.resume = resume;
        this.niveau = niveau;
        this.statut = statut;
        this.datePublication = datePublication;
        this.categorie = categorie;
    }

    public Long getId_fiche() { return id_fiche; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getResume() { return resume; }
    public void setResume(String resume) { this.resume = resume; }
    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public Instant getDatePublication() { return datePublication; }
    public Instant getDateModification() { return dateModification; }
    public void setDateModification(Instant dateModification) { this.dateModification = dateModification; }
    public Integer getNombresDeVues() { return nombresDeVues; }
    public void setNombresDeVues(Integer nombresDeVues) { this.nombresDeVues = nombresDeVues; }
    public CategoriePeinture getCategorie() { return categorie; }
    public void setCategorie(CategoriePeinture categorie) { this.categorie = categorie; }
    public Set<FichePeinture> getFichesLiees() { return fichesLiees; }
    public void setFichesLiees(Set<FichePeinture> fichesLiees) { this.fichesLiees = fichesLiees; }
}
