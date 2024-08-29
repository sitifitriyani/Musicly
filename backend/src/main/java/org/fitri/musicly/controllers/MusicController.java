package org.fitri.musicly.controllers;

import java.util.List;

import org.fitri.musicly.models.Music;
import org.fitri.musicly.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/music")
public class MusicController {
@Autowired
    private MusicRepository musicRepository;

    @GetMapping
    public List<Music> getAllMusics() {
        return musicRepository.findAll();
    }

    @PostMapping
    public String createMusic(@RequestBody Music music) {
         musicRepository.save(music);
         return "music berhasil ditambahkan";
    }

    @PutMapping("/{id}")
    public ResponseEntity<Music> updateMusic(@PathVariable Long id, @RequestBody Music musicDetails) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music == null) {
            return ResponseEntity.notFound().build();
        }

        music.setTitle(musicDetails.getTitle());
        music.setDuration(musicDetails.getDuration());
        music.setYear(musicDetails.getYear());
        music.setSongUrl(musicDetails.getSongUrl());
        music.setImageUrl(musicDetails.getImageUrl());
        music.setAlbum(musicDetails.getAlbum());
        // music.setArtist(musicDetails.getArtist());
        music.setGenre(musicDetails.getGenre());

        final Music updatedMusic = musicRepository.save(music);
        return ResponseEntity.ok(updatedMusic);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMusic(@PathVariable Long id) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music == null) {
            return ResponseEntity.notFound().build();
        }
        musicRepository.delete(music);
        return ResponseEntity.noContent().build();
    }
    // return "music berhasil di hapus";
}
