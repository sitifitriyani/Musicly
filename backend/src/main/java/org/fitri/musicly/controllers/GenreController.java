package org.fitri.musicly.controllers;
import java.util.List;

import org.fitri.musicly.models.Genre;
import org.fitri.musicly.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin (origins = "http://localhost:5173")
@RestController
@RequestMapping("/genre")

public class GenreController {
     @Autowired
    private GenreRepository genreRepository;

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    @PostMapping
    public String createGenre(@RequestBody Genre genre) {
         genreRepository.save(genre);
         return "genre berhasil ditambahkan";
    }

    @PutMapping("/{id}")
    public Genre updateGenre(@PathVariable Long id, @RequestBody Genre genreDetails) {
        Genre genre = genreRepository.findById(id).orElse(null);
        if (genre != null) {
            genre.setGenre(genreDetails.getGenre());
            return genreRepository.save(genre);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteGenre(@PathVariable Long id) {
        genreRepository.deleteById(id);
        return "genre berhasil di hapus";
    }
}
