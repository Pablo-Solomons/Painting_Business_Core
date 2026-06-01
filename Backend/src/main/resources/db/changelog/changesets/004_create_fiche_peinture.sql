--liquibase formatted sql
--changeset Cesar:004_create_fiche_peinture
--comment: Create fiche_peinture table

CREATE SEQUENCE fiche_peinture_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE fiche_peinture (
    id_fiche BIGINT NOT NULL DEFAULT nextval('fiche_peinture_seq'),
    titre VARCHAR(255) NOT NULL,
    resume TEXT,
    niveau VARCHAR(255),
    statut VARCHAR(255),
    date_publication TIMESTAMP WITH TIME ZONE,
    date_modification TIMESTAMP WITH TIME ZONE,
    nombres_de_vues INTEGER DEFAULT 0,
    id_categorie BIGINT,
    CONSTRAINT pk_fiche_peinture PRIMARY KEY (id_fiche),
    CONSTRAINT fk_fiche_peinture_categorie FOREIGN KEY (id_categorie) REFERENCES categorie_peinture(id_categorie)
);
