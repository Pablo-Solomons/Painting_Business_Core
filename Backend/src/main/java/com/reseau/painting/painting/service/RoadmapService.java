package com.reseau.painting.painting.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reseau.painting.painting.domain.Roadmap;

@Service
public class RoadmapService {

    private final ConcurrentHashMap<UUID, Roadmap> roadmaps = new ConcurrentHashMap<>();

    public List<Roadmap> findAll() {
        return roadmaps.values().stream()
                .sorted(Comparator.comparing(Roadmap::getTitre, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public Roadmap findById(UUID id) {
        Roadmap roadmap = roadmaps.get(id);
        if (roadmap == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Roadmap introuvable");
        }
        return roadmap;
    }

    public Roadmap create(Roadmap roadmap) {
        UUID id = roadmap.getId() != null ? roadmap.getId() : UUID.randomUUID();
        roadmap.setId(id);
        roadmaps.put(id, roadmap);
        return roadmap;
    }

    public Roadmap update(UUID id, Roadmap roadmap) {
        if (!roadmaps.containsKey(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Roadmap introuvable");
        }
        roadmap.setId(id);
        roadmaps.put(id, roadmap);
        return roadmap;
    }

    public void delete(UUID id) {
        if (roadmaps.remove(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Roadmap introuvable");
        }
    }

    public List<Roadmap> search(String query) {
        String normalizedQuery = query == null ? "" : query.trim().toLowerCase();
        return roadmaps.values().stream()
                .filter(roadmap -> matches(roadmap, normalizedQuery))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private boolean matches(Roadmap roadmap, String query) {
        if (query.isEmpty()) {
            return true;
        }

        boolean titleMatch = roadmap.getTitre() != null && roadmap.getTitre().toLowerCase().contains(query);
        boolean descriptionMatch = roadmap.getDescription() != null && roadmap.getDescription().toLowerCase().contains(query);
        boolean ficheMatch = roadmap.getFiches() != null && roadmap.getFiches().stream().anyMatch(fiche ->
                (fiche.getTitre() != null && fiche.getTitre().toLowerCase().contains(query))
                        || (fiche.getDescription() != null && fiche.getDescription().toLowerCase().contains(query)));

        return titleMatch || descriptionMatch || ficheMatch;
    }
}