--liquibase formatted sql
--changeset Cesar:003_create_tag
--comment: Create tag table

CREATE SEQUENCE tag_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE tag (
    id_tag BIGINT NOT NULL DEFAULT nextval('tag_seq'),
    nom VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    CONSTRAINT pk_tag PRIMARY KEY (id_tag),
    CONSTRAINT uq_tag_slug UNIQUE (slug)
);
