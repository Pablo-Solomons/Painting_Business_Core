--liquibase formatted sql
--changeset TC:001
CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--changeset TC:002
INSERT INTO test_table (name) VALUES ('Test Name 1');
INSERT INTO test_table (name) VALUES ('Test Name 2');