--liquibase formatted sql
--changeset Cesar:009_create_roadmap
--comment: Create roadmap table

CREATE SEQUENCE roadmap_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE roadmap (
    id_roadmap BIGINT NOT NULL DEFAULT nextval('roadmap_seq'),
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    id_user BIGINT,
    id_categorie BIGINT,
    CONSTRAINT pk_roadmap PRIMARY KEY (id_roadmap),
    CONSTRAINT fk_roadmap_utilisateur FOREIGN KEY (id_user) REFERENCES utilisateur(id_user),
    CONSTRAINT fk_roadmap_categorie FOREIGN KEY (id_categorie) REFERENCES categorie_peinture(id_categorie)
);
