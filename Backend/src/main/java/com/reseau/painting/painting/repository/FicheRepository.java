package com.reseau.painting.painting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reseau.painting.painting.entity.FichePeinture;

public interface FicheRepository extends JpaRepository<FichePeinture, Long> {
    
}
