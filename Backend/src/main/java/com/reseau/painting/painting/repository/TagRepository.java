package com.painting.metier.repository;
import com.bcaas.metier.entite.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository public interface TagRepository extends JpaRepository<Tag, Long> { 
    Optional<Tag> findByValeur(String valeur);
    boolean existsByValeur(String valeur);
    // Chercher tous les tags dont la valeur contient un mot (recherche partielle)
    List<Tag> findByValeurContainingIgnoreCase(String mot);
}