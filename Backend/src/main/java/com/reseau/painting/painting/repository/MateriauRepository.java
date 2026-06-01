package com.reseau.painting.painting.repository;
import com.reseau.painting.painting.entity.Materiau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository public interface MateriauRepository extends JpaRepository<Materiau, Long> {
    Optional<Materiau> findByNom(String nom);
    boolean existsByNom(String nom);
}