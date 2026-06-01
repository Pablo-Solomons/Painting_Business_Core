--liquibase formatted sql
--changeset Cesar:005_create_fiche_index
--comment: Create fiche_index join table for fiche_peinture self-referencing many-to-many

CREATE SEQUENCE fiche_index_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE fiche_index (
    id_index BIGINT NOT NULL DEFAULT nextval('fiche_index_seq'),
    id_fiche1 BIGINT NOT NULL,
    id_fiche2 BIGINT NOT NULL,
    CONSTRAINT pk_fiche_index PRIMARY KEY (id_index),
    CONSTRAINT fk_fiche_index_fiche1 FOREIGN KEY (id_fiche1) REFERENCES fiche_peinture(id_fiche),
    CONSTRAINT fk_fiche_index_fiche2 FOREIGN KEY (id_fiche2) REFERENCES fiche_peinture(id_fiche)
);
