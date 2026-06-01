package com.painting.auth.security;

import com.painting.auth.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository Spring Data JPA pour l'entité Utilisateur.
 * Spring génère automatiquement les requêtes SQL à partir des noms de méthodes.
 */
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    /** Cherche un utilisateur par son email (pour la connexion). */
    Optional<Utilisateur> findByEmail(String email);

    /** Vérifie si un email est déjà utilisé (pour l'inscription). */
    boolean existsByEmail(String email);

    /** Cherche un utilisateur par son token de validation de compte. */
    Optional<Utilisateur> findByTokenValidation(String token);
}