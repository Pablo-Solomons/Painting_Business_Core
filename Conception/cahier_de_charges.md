# Cahier de charges Painting Business Core


## 1. Contexte et problematique

#### Contexte

Le domaine de la peinture couvre trois familles de pratiques: la peinture artistique, la peinture en bâtiment et le peinture décorative. Ces metiers partagent des savoirs fondamentaux mais se distinguent par leurs formations, leurs débouchés et leurs règles professionnelles.

Aujourd'hui, l'information sur le metier de peintre est fragmentée, dispersée entre des sites institutionnels,des organisations professionnelles et des forums en ligne. Il n'existe **aucune plateforme unique, structurée et maintenue par les peintres eux-mêmes** qui centralise les savoirs du métier (techniques, outils, matériaux, formations, réglementation).

#### Problématique

Comment permettre à toute personne intéressée par les metiers de la peinture (étudiant,amateur,professionnel) d'acceder facilement à une information fiable,structurée et enrichie par les practiciens ?
Sans cette solution, un étudiant qui veut devenir peintre doit naviguer entre une dizaine de sites diférents, sans savoir quelle information est fiable ni par où commencer. Les peintres professionels, eux n'ont aucun espace dédié pour partager leur expertise et faire connaitre leur travail.

## 2. Objectif du projet

Painting Business Core vise à créer une plateforme web qui centralise les savoirs du metier de peintre: techniques, formations,outils, réglementation,et profils de peintres.Elle est accessible librement à tous les visiteurs, enrichie par des peintres inscrit et validés, et modèrée par un ou plusieurs administrateurs.

\newpage

## 3. Analogie réseau et approche BCaaS

Conformément aux attendus du cours, la plateforme applique les concepts fondamentaux des réseaux de communication et s'inscrit dans l'approche **BCaaS (Business Core as a Service)**.

#### 3.1 Correspondance émetteur / récepteur / protocole

Chaque composant du modèle de communication réseau trouve son équivalent dans Painting Business Core :

| Concept réseau                    | Équivalent dans Painting Business Core                                        |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| **Émetteur** (source)       | Peintre contributeur (publie son savoir, ses fiches techniques, ses roadmaps)  |
| **Récepteur** (destination) | Visiteur (étudiant, amateur, galeriste, collectionneur)                       |
| **Canal**                    | Plateforme web (Painting Business Core)                                        |
| **Protocole**                | Règles métier : validation admin des comptes, format des fiches, modération |
| **Message**                  | Fiche métier, roadmap, tutoriel, profil de peintre                            |
| **Adressage**                | URL canonique de chaque fiche + géolocalisation des peintres                  |
| **Routage**                  | Moteur de recherche + carte interactive (Leaflet.js)                           |
| **Bruit**                    | Contenu non valide, spam ou hors sujet (filtré par modération)               |
| **Accusé de réception**    | Validation admin du compte peintre                                             |

#### 3.2 Pile protocolaire métier (5 couches)

Inspirée du modèle OSI/TCP-IP et de l'approche BCaaS, la plateforme est structurée en 5 couches. Chaque couche offre des services à la couche supérieure et cache sa complexité à la couche inférieure.

| Couche                             | Rôle                                    | Dans Painting Business Core                                                          |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| **5. Business capabilities** | Acteurs, ressources, opérations métier | Peintre (émetteur), Visiteur (récepteur), Admin (régulateur), Fiches, Roadmaps    |
| **4. Context & policy**      | Identité, permissions, règles          | Validation des comptes, modération des contenus, droits (VISITOR / PAINTER / ADMIN) |
| **3. Tenant & routing**      | Résolution du tenant, routage           | Isolation de l'instance "Painting" au sein du BCaaS, routage des requêtes           |
| **2. Transport & messaging** | Sync/async, timeout, idempotence         | API REST Spring Boot, JWT, gestion des sessions                                      |
| **1. Infrastructure**        | Base de données, cache, stockage        | PostgreSQL + PostGIS, Redis, MinIO, Docker                                           |

#### 3.3 Le "paquet métier" (encapsulation)

Conformément à l'approche BCaaS, chaque requête API embarque des **en-têtes contextuels** séparés du contenu métier (payload) :

| En-tête       | Exemple         | Rôle                                                       |
| -------------- | --------------- | ----------------------------------------------------------- |
| `actor_id`   | `painter-007` | Identifie l'émetteur (peintre ou visiteur)                 |
| `role_scope` | `PAINTER`     | Définit les droits applicables (VISITOR / PAINTER / ADMIN) |
| `trace_id`   | `abc-123-xyz` | Traçabilité bout en bout des requêtes                    |
| `locale`     | `fr-CM`       | Langue et région (i18n, multi-devises)                     |

Cette séparation permet de traiter la donnée métier tout en respectant les politiques communes, sans que chaque service ait à connaître toute l'application.

#### 3.4 Place dans l'écosystème BCaaS

Painting Business Core est une **instance spécialisée** du Business Core générique, au même titre que les autres instances listées dans le projet (Bookstore, Real Estate, Insurance, Tourism, etc.). Elle partage la même fondation architecturale :

- Pile protocolaire en 5 couches
- En-têtes contextuels standardisés
- Isolation multi-tenant
- Observabilité et QoS
- 

\newpage

## 4. Périmètre du projet

#### 4.1 Ce qui est dans le périmètre

Le projet consiste à créer une plateforme web centralisant les savoirs des métiers de la peinture (techniques,formations,outils,réglementation,profils de peintres).

**Les bénéficiares principaux sont:**

+ les étudiants en arts
+ les peintres professionnels et
+ les amateurs d'art.

**Les acteurs impliqués sont:**

+ les visiteurs de la plateforme(lecture libre)
+ les peintres contributeurs, et
+ les administrateur(modération).

Le périmètre fonctionnel commence par la consultation libre des fiches métier et s'arrête à publication et à la modération des contenus par les peintres et l'admin.

#### 4.2 Hors Périmètre

**Ne sont pas impliqués** :

+ les acheteurs d'œuvres
+ les donneurs d'ordre pour des travaux de peinture en bâtiment
+ ni aucun système de vente ou de facturation.

**Sont explicitement exclus** :

+ galerie marchande
+ devis
+ commandes
+ messagerie client-peintre
+ notation des prestations
+ gestion de chantiers.

\newpage

## 5. Specifications fonctionnelles

#### 5.1 Fonctionnalités pour le Visiteur(sans compte)

+ Consulter la liste des fiches métier par catégorie
+ Rechercher un peintre par nom ou spécialité
+ Visualiser le détail d'une fiche(description,compétences,médias)
+ Voir les peintres sur une carte interactive

#### 5.2 Fontionnalités pour le Peintre(connecté et validé)

+ Créer et modifier son profil professionnel
+ Publier des fiches métier(techniques,formations,tutoriels)
+ Modifier ou archiver ses propres publications

#### 5.3 Fontionnalités pour l'Administrateur

+ Valider ou rejeter les demandes d'inscription des peintres
+ Modérer les contenus publiés(suppression si non-conformes)
+ Créer,modifier ou supprimer des catégories et tags
+ Suspendre un compte peintre en cas d'abus

#### 5.4 Règles transverses

* Seul un peintre avec compte validé peut publier
* Les fiches doivent suivre un format défini (titre, catégorie, corps, tags)
* Chaque requête API est tracée avec identifiant utilisateur

\newpage

## 6. Spécifications tehniques

#### 6.1 Stack technique

| Composant        | Technologie             | Justification                     |
| ---------------- | ----------------------- | --------------------------------- |
| Frontend         | Next.js 14              | SEO, React,i18n intégré         |
| Backend API      | Spring Boot 3           | Robuste , sécurité mature       |
| Base de données | PostgreSQL              | Recherche full-text               |
| Cache            | Redis 7                 | Sessions et requêtes fréquentes |
| Stockage médias | Minio                   | Auto-hébergé,open source        |
| Conteneurisation | DOcker + Docker Compose | Reproductibilité                 |
| Authentification | JWT+OAuth2+2FA          | Sécurité stateless              |

#### 6.2 Contrainte techniques

+ Tous les composants sont open source ou gratuits pour usage éducatif
+ L'application sera déployée sur les serveurs de l'université (ou en localhost)
+ Fichiers uploadés : 10 Mo max, formats : JPG, PNG, WebP, MP4
+ HTTPS obligatoire avec en-têtes de sécurité (CSP, HSTS, X-Frame-Options)
+ Temps de chargement cible : moins de 2 secondes sur connexion 4G
+ Score Lighthouse PWA : supérieur à 90

#### 6.3 Technologies exclues (pour rester dans le périmètre)

| Technologie exclue        | Raison                                   |
| ------------------------- | ---------------------------------------- |
| Application mobile native | PWA suffit pour mobile                   |
| GraphQL                   | REST répond aux besoins                 |
| Apache Kafka              | Surdimensionné pour un projet étudiant |
| Spring WebFlux            | Courbe d'apprentissage trop élevée     |
