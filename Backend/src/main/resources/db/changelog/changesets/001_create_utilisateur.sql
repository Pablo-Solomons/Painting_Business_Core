--liquibase formatted sql
--changeset Cesar:001_create_utilisateur
--comment: Create utilisateur table

CREATE SEQUENCE utilisateur_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE utilisateur (
    id_user BIGINT NOT NULL DEFAULT nextval('utilisateur_seq'),
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP WITH TIME ZONE,
    addresse VARCHAR(255),
    CONSTRAINT pk_utilisateur PRIMARY KEY (id_user)
);
