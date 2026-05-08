CREATE TABLE utilisateur (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
    adresse TEXT
);

CREATE TABLE categorie_peinture (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    id_parent INT NULL,
    nom VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    FOREIGN KEY (id_parent) REFERENCES categorie_peinture(id_categorie) ON DELETE SET NULL
);

CREATE TABLE tag (
    id_tag INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE fiche_peinture (
    id_fiche INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    resume TEXT,
    niveau VARCHAR(50),
    date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'brouillon',
    date_modification DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    nb_vues INT DEFAULT 0,
    id_categorie INT NOT NULL,
    FOREIGN KEY (id_categorie) REFERENCES categorie_peinture(id_categorie)
);

CREATE TABLE roadmap (
    id_roadmap INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    id_user INT NOT NULL,
    id_categorie INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user),
    FOREIGN KEY (id_categorie) REFERENCES categorie_peinture(id_categorie)
);

CREATE TABLE roadmap_fiche (
    id_roadmap INT NOT NULL,
    id_fiche INT NOT NULL,
    PRIMARY KEY (id_roadmap, id_fiche),
    FOREIGN KEY (id_roadmap) REFERENCES roadmap(id_roadmap) ON DELETE CASCADE,
    FOREIGN KEY (id_fiche) REFERENCES fiche_peinture(id_fiche) ON DELETE CASCADE
);

CREATE TABLE media (
    id_media INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500) NOT NULL,
    type VARCHAR(50),
    taille INT,
    date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE fiche_media (
    id_media INT NOT NULL,
    id_fiche INT NOT NULL,
    PRIMARY KEY (id_media, id_fiche),
    FOREIGN KEY (id_media) REFERENCES media(id_media) ON DELETE CASCADE,
    FOREIGN KEY (id_fiche) REFERENCES fiche_peinture(id_fiche) ON DELETE CASCADE
);

CREATE TABLE fiche_tag (
    id_fiche INT NOT NULL,
    id_tag INT NOT NULL,
    PRIMARY KEY (id_fiche, id_tag),
    FOREIGN KEY (id_fiche) REFERENCES fiche_peinture(id_fiche) ON DELETE CASCADE,
    FOREIGN KEY (id_tag) REFERENCES tag(id_tag) ON DELETE CASCADE
);

CREATE TABLE fiche_index (
    id_fiche1 INT NOT NULL,
    id_fiche2 INT NOT NULL,
    PRIMARY KEY (id_fiche1, id_fiche2),
    FOREIGN KEY (id_fiche1) REFERENCES fiche_peinture(id_fiche) ON DELETE CASCADE,
    FOREIGN KEY (id_fiche2) REFERENCES fiche_peinture(id_fiche) ON DELETE CASCADE,
    CHECK (id_fiche1 < id_fiche2)
);

CREATE TABLE audit_log (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id INT NOT NULL,
    old_values TEXT,
    new_values TEXT,
    date_action DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_adresse VARCHAR(45),
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user) ON DELETE SET NULL
);
