package com.reseau.painting.painting.controller;

import java.util.List;
import java.util.UUID;

import com.reseau.painting.painting.domain.Categorie;
import com.reseau.painting.painting.domain.FichePeinture;
import com.reseau.painting.painting.domain.Tag;
import com.reseau.painting.painting.service.FicheService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fiches")
public class FicheController {

    private final FicheService ficheService;

    public FicheController(FicheService ficheService) {
        this.ficheService = ficheService;
    }

    @GetMapping
    public ResponseEntity<List<FichePeinture>> findAll() {
        return ResponseEntity.ok(ficheService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichePeinture> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(ficheService.findById(id));
    }

    @PostMapping
    public ResponseEntity<FichePeinture> create(@RequestBody FicheRequest request) {
        return ResponseEntity.ok(ficheService.create(toDomain(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichePeinture> update(@PathVariable UUID id, @RequestBody FicheRequest request) {
        return ResponseEntity.ok(ficheService.update(id, toDomain(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        ficheService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private FichePeinture toDomain(FicheRequest request) {
        Categorie categorie = request.categorie() == null ? null : new Categorie(null, request.categorie());
        List<Tag> tags = request.tags() == null ? List.of() : request.tags().stream().map(tag -> new Tag(null, tag)).toList();
        return new FichePeinture(null, request.titre(), request.description(), categorie, tags);
    }

    public record FicheRequest(String titre, String description, String categorie, List<String> tags) {
    }
}