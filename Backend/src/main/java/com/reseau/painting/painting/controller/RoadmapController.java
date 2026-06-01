package com.reseau.painting.painting.controller;

import java.util.List;
import java.util.UUID;

import com.reseau.painting.painting.domain.Roadmap;
import com.reseau.painting.painting.service.RoadmapService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<List<Roadmap>> findAll() {
        return ResponseEntity.ok(roadmapService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roadmap> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(roadmapService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Roadmap> create(@RequestBody RoadmapRequest request) {
        return ResponseEntity.ok(roadmapService.create(toDomain(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Roadmap> update(@PathVariable UUID id, @RequestBody RoadmapRequest request) {
        return ResponseEntity.ok(roadmapService.update(id, toDomain(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        roadmapService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private Roadmap toDomain(RoadmapRequest request) {
        return new Roadmap(null, request.titre(), request.description(), List.of());
    }

    public record RoadmapRequest(String titre, String description) {
    }
}