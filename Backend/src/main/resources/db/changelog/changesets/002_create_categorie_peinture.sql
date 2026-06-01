--liquibase formatted sql
--changeset Cesar:002_create_categorie_peinture
--comment: Create categorie_peinture table

CREATE SEQUENCE categorie_peinture_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE categorie_peinture (
    id_categorie BIGINT NOT NULL DEFAULT nextval('categorie_peinture_seq'),
    id_parent BIGINT,
    nom VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    CONSTRAINT pk_categorie_peinture PRIMARY KEY (id_categorie),
    CONSTRAINT uq_categorie_peinture_slug UNIQUE (slug),
    CONSTRAINT fk_categorie_peinture_parent FOREIGN KEY (id_parent) REFERENCES categorie_peinture(id_categorie)
);
