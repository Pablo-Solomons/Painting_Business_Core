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

import com.reseau.painting.painting.domain.FichePeinture;

@Service
public class FicheService {

    private final ConcurrentHashMap<UUID, FichePeinture> fiches = new ConcurrentHashMap<>();

    public List<FichePeinture> findAll() {
        return fiches.values().stream()
                .sorted(Comparator.comparing(FichePeinture::getTitre, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public FichePeinture findById(UUID id) {
        FichePeinture fiche = fiches.get(id);
        if (fiche == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fiche introuvable");
        }
        return fiche;
    }

    public FichePeinture create(FichePeinture fiche) {
        UUID id = fiche.getId() != null ? fiche.getId() : UUID.randomUUID();
        fiche.setId(id);
        fiches.put(id, fiche);
        return fiche;
    }

    public FichePeinture update(UUID id, FichePeinture fiche) {
        if (!fiches.containsKey(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fiche introuvable");
        }
        fiche.setId(id);
        fiches.put(id, fiche);
        return fiche;
    }

    public void delete(UUID id) {
        if (fiches.remove(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fiche introuvable");
        }
    }

    public List<FichePeinture> search(String query) {
        String normalizedQuery = query == null ? "" : query.trim().toLowerCase();
        return fiches.values().stream()
                .filter(fiche -> matches(fiche, normalizedQuery))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private boolean matches(FichePeinture fiche, String query) {
        if (query.isEmpty()) {
            return true;
        }

        boolean titleMatch = fiche.getTitre() != null && fiche.getTitre().toLowerCase().contains(query);
        boolean descriptionMatch = fiche.getDescription() != null && fiche.getDescription().toLowerCase().contains(query);
        boolean categoryMatch = fiche.getCategorie() != null
                && fiche.getCategorie().getNom() != null
                && fiche.getCategorie().getNom().toLowerCase().contains(query);
        boolean tagMatch = fiche.getTags() != null && fiche.getTags().stream().anyMatch(tag ->
                tag.getNom() != null && tag.getNom().toLowerCase().contains(query));

        return titleMatch || descriptionMatch || categoryMatch || tagMatch;
    }
}