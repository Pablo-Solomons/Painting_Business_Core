--liquibase formatted sql
--changeset Cesar:010_create_audit_log
--comment: Create audit_log table

CREATE SEQUENCE audit_log_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE audit_log (
    id_log BIGINT NOT NULL DEFAULT nextval('audit_log_seq'),
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(255),
    entity_id BIGINT,
    old_values TEXT,
    new_values TEXT,
    date_action TIMESTAMP WITH TIME ZONE,
    id_user BIGINT,
    CONSTRAINT pk_audit_log PRIMARY KEY (id_log),
    CONSTRAINT fk_audit_log_utilisateur FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)
);
