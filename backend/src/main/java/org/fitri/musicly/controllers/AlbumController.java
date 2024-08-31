package org.fitri.musicly.controllers;

import java.util.List;

import org.fitri.musicly.models.Album;
import org.fitri.musicly.repository.AlbumRepository;
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
@RequestMapping("/album")
public class AlbumController {
    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable Long id, @RequestBody Album albumDetails) {
        Album album = albumRepository.findById(id).orElse(null);
        if (album != null) {
            album.setName(albumDetails.getName());
            album.setReleaseYear(albumDetails.getReleaseYear());
            album.setArtist(albumDetails.getArtist());
            album.setImageUrl(albumDetails.getImageUrl());
            return albumRepository.save(album);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteAlbum(@PathVariable Long id) {
        albumRepository.deleteById(id);
        return "Album berhasil di hapus";
    }
}
