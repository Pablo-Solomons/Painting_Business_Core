package com.reseau.painting.painting.controller;

import java.util.List;

import com.reseau.painting.painting.domain.FichePeinture;
import com.reseau.painting.painting.domain.Roadmap;
import com.reseau.painting.painting.service.FicheService;
import com.reseau.painting.painting.service.RoadmapService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final FicheService ficheService;
    private final RoadmapService roadmapService;

    public SearchController(FicheService ficheService, RoadmapService roadmapService) {
        this.ficheService = ficheService;
        this.roadmapService = roadmapService;
    }

    @GetMapping("/fiches")
    public ResponseEntity<List<FichePeinture>> searchFiches(@RequestParam(defaultValue = "") String q) {
        return ResponseEntity.ok(ficheService.search(q));
    }

    @GetMapping("/roadmaps")
    public ResponseEntity<List<Roadmap>> searchRoadmaps(@RequestParam(defaultValue = "") String q) {
        return ResponseEntity.ok(roadmapService.search(q));
    }
}