package com.painting.auth.entity;

/**
 * Enumération des rôles possibles dans l'application de peinture.
 * - PEINTRE  : artiste qui publie des fiches et roadmaps
 * - CLIENT   : acheteur ou visiteur qui consulte les oeuvres
 * - GALERIE  : gestionnaire d'espace d'exposition
 * - ADMIN    : administrateur de la plateforme
 */
public enum RoleUtilisateur {
    PEINTRE,
    CLIENT,
    GALERIE,
    ADMIN
}