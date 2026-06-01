--liquibase formatted sql
--changeset Cesar:006_create_media
--comment: Create media table

CREATE SEQUENCE media_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE media (
    id_media BIGINT NOT NULL DEFAULT nextval('media_seq'),
    url VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    taille BIGINT NOT NULL,
    date_de_publication TIMESTAMP WITH TIME ZONE NOT NULL,
    id_user BIGINT,
    id_fiche BIGINT,
    CONSTRAINT pk_media PRIMARY KEY (id_media),
    CONSTRAINT fk_media_utilisateur FOREIGN KEY (id_user) REFERENCES utilisateur(id_user),
    CONSTRAINT fk_media_fiche FOREIGN KEY (id_fiche) REFERENCES fiche_peinture(id_fiche)
);
