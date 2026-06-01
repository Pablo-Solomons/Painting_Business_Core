package com.bcaas.metier.repository;
import com.bcaas.metier.entite.Materiau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository public interface MateriauRepository extends JpaRepository<Materiau, Long> {
    Optional<Materiau> findByNom(String nom);
    boolean existsByNom(String nom);
}