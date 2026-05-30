package com.reseau.painting.entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Table(name = "fiche_index")
public class FicheIndex {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idIndex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fiche1", nullable = false)
    private FichePeinture fiche1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fiche2", nullable = false)
    private FichePeinture fiche2;

    public FicheIndex() {}

    public FicheIndex(FichePeinture fiche1, FichePeinture fiche2) {
        this.fiche1 = fiche1;
        this.fiche2 = fiche2;
    }

    public Long getIdIndex() { return idIndex; }
    public FichePeinture getFiche1() { return fiche1; }
    public FichePeinture getFiche2() { return fiche2; }

}
