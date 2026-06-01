package com.reseau.painting.painting.controller;
import com.reseau.painting.dto.CategorieDto; 
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; 
import java.util.List;


@RestController @RequestMapping('/api/categories') @RequiredArgsConstructor public class CategorieController extends AbstractController<CategorieDto> {
 private final CategorieService categorieService;
 @GetMapping public ResponseEntity<List<CategorieDto>> getAll() {
    return ResponseEntity.ok(categorieService.findAll());
 }
 @GetMapping('/{id}') public ResponseEntity<CategorieDto> getById(@PathVariable Long id) {
    return ResponseEntity.ok(categorieService.findById(id));
 }
 @PostMapping public ResponseEntity<CategorieDto> create(@RequestBody CategorieDto dto) {
    return ResponseEntity.status(201).body(categorieService.create(dto));
 }

