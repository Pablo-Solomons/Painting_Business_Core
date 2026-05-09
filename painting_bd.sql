CREATE TABLE utilisateur (
    id_user SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    adresse TEXT
);

CREATE TABLE categorie_peinture (
    id_categorie SERIAL PRIMARY KEY,
    id_parent INT NULL,
    nom VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    CONSTRAINT fk_parent FOREIGN KEY (id_parent) REFERENCES categorie_peinture(id_categorie) ON DELETE SET NULL
);

-- Note: SERIAL automatically creates the sequence for your IDs in Postgres.

CREATE TABLE fiche_peinture (
    id_fiche SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    resume TEXT,
    niveau VARCHAR(50),
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'brouillon',
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Triggers are needed for "ON UPDATE"
    nb_vues INT DEFAULT 0,
    id_categorie INT NOT NULL,
    CONSTRAINT fk_categorie FOREIGN KEY (id_categorie) REFERENCES categorie_peinture(id_categorie)
);