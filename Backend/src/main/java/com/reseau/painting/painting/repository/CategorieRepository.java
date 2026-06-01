package com.painting.metier.repository;
import com.painting.metier.entite.categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    // chercher une catégorie par son nom (ex: 'Portrait') Optional<Categorie> findByNom(String nom)
    // Vérifier si une catégorie avec ce nom existe déjà boolean existsByNom(String nom)
}