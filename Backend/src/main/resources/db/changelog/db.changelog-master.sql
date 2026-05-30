--liquibase formatted sql

-- ========================================
-- Master changelog for Painting Business Core
-- ========================================

-- Include all changesets in dependency order
-- 1. Tables with no dependencies
--include file="changesets/001_create_utilisateur.sql"
--include file="changesets/002_create_categorie_peinture.sql"
--include file="changesets/003_create_tag.sql"

-- 2. Tables depending on utilisateur and categorie_peinture
--include file="changesets/004_create_fiche_peinture.sql"

-- 3. Join table for fiche_peinture self-reference
--include file="changesets/005_create_fiche_index.sql"

-- 4. Tables depending on utilisateur and fiche_peinture
--include file="changesets/006_create_media.sql"

-- 5. Join tables
--include file="changesets/007_create_fiche_media.sql"
--include file="changesets/008_create_fiche_tag.sql"

-- 6. Tables depending on utilisateur and categorie_peinture
--include file="changesets/009_create_roadmap.sql"

-- 7. Table depending on utilisateur
--include file="changesets/010_create_audit_log.sql"
