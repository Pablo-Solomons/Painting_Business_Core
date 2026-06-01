--liquibase formatted sql
--changeset Cesar:008_create_fiche_tag
--comment: Create fiche_tag join table for fiche_peinture and tag

CREATE SEQUENCE fiche_tag_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE fiche_tag (
    id_fiche_tag BIGINT NOT NULL DEFAULT nextval('fiche_tag_seq'),
    id_fiche BIGINT,
    id_tag BIGINT,
    CONSTRAINT pk_fiche_tag PRIMARY KEY (id_fiche_tag),
    CONSTRAINT fk_fiche_tag_fiche FOREIGN KEY (id_fiche) REFERENCES fiche_peinture(id_fiche),
    CONSTRAINT fk_fiche_tag_tag FOREIGN KEY (id_tag) REFERENCES tag(id_tag)
);
