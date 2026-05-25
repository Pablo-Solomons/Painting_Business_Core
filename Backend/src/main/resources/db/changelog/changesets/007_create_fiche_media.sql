--liquibase formatted sql
--changeset Cesar:007_create_fiche_media
--comment: Create fiche_media join table for media and fiche_peinture

CREATE SEQUENCE fiche_media_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE fiche_media (
    id_fiche_media BIGINT NOT NULL DEFAULT nextval('fiche_media_seq'),
    id_media BIGINT,
    id_fiche BIGINT,
    CONSTRAINT pk_fiche_media PRIMARY KEY (id_fiche_media),
    CONSTRAINT fk_fiche_media_media FOREIGN KEY (id_media) REFERENCES media(id_media),
    CONSTRAINT fk_fiche_media_fiche FOREIGN KEY (id_fiche) REFERENCES fiche_peinture(id_fiche)
);
