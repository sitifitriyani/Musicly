package org.fitri.musicly.controllers;

import java.util.List;

import org.fitri.musicly.models.Artist;
import org.fitri.musicly.repository.ArtistRepository;
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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/artist")
public class ArtistController {
    @Autowired
    private ArtistRepository artistRepository;

    @GetMapping
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @PostMapping
    public String createArtist(@RequestBody Artist artist) {
        artistRepository.save(artist);
        return "Artist berhasil di tambahkan";
    }

    @PutMapping("/{id}")
    public Artist updateArtist(@PathVariable Long id, @RequestBody Artist artistDetails) {
        Artist artist = artistRepository.findById(id).orElse(null);
        if (artist != null) {
            artist.setName(artistDetails.getName());
            artist.setCountry(artistDetails.getCountry());
            artist.setImageUrl(artistDetails.getImageUrl());
            return artistRepository.save(artist);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteArtist(@PathVariable Long id) {
        artistRepository.deleteById(id);
        return "aristst berhasil di hapus";
    }
}
