package com.reseau.painting.painting.repository;
import com.reseau.painting.painting.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository public interface TagRepository extends JpaRepository<Tag, Long> { 
    Optional<Tag> findByValeur(String valeur);
    boolean existsByValeur(String valeur);
    // Chercher tous les tags dont la valeur contient un mot (recherche)
    List<Tag> findByValeurContainingIgnoreCase(String mot);
}