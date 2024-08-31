package org.fitri.musicly.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.fitri.musicly.models.Album;
import org.fitri.musicly.models.Genre;
import org.fitri.musicly.models.Music;
import org.fitri.musicly.repository.AlbumRepository;
import org.fitri.musicly.repository.GenreRepository;
import org.fitri.musicly.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/music")
public class MusicController {

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private GenreRepository genreRepository;

    private static final String FILE_UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Music> getAllMusics() {
        return musicRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> createMusic(
            @RequestParam("title") String title,
            @RequestParam("duration") Double duration,
            @RequestParam("albumId") Long albumId,
            @RequestParam("genreId") Long genreId,
            @RequestParam(value = "song", required = false) MultipartFile song,
            @RequestParam(value = "imageUrl", required = false) MultipartFile imageUrl
    ) {
        try {
            // Handle file uploads
            String songPath = uploadFile(song);
            String imagePath = uploadFile(imageUrl);

            // Find Album and Genre
            Album album = albumRepository.findById(albumId).orElse(null);
            Genre genre = genreRepository.findById(genreId).orElse(null);

            if (album == null || genre == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid album or genre ID");
            }

            // Create and save the Music entity
            Music music = new Music();
            music.setTitle(title);
            music.setDuration(duration);
            music.setSongUrl(songPath);
            music.setImageUrl(imagePath);
            music.setAlbum(album);
            music.setGenre(genre);

            musicRepository.save(music);

            return ResponseEntity.status(HttpStatus.CREATED).body("Music successfully added");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload files");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMusic(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("duration") Double duration,
            @RequestParam("albumId") Long albumId,
            @RequestParam("genreId") Long genreId,
            @RequestParam(value = "song", required = false) MultipartFile song,
            @RequestParam(value = "imageUrl", required = false) MultipartFile imageUrl
    ) {
        try {
            Music music = musicRepository.findById(id).orElse(null);
            if (music == null) {
                return ResponseEntity.notFound().build();
            }

            // Handle file uploads
            if (song != null) {
                String songPath = uploadFile(song);
                music.setSongUrl(songPath);
            }
            if (imageUrl != null) {
                String imagePath = uploadFile(imageUrl);
                music.setImageUrl(imagePath);
            }

            // Find Album and Genre
            Album album = albumRepository.findById(albumId).orElse(null);
            Genre genre = genreRepository.findById(genreId).orElse(null);

            if (album == null || genre == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid album or genre ID");
            }

            music.setTitle(title);
            music.setDuration(duration);
            music.setAlbum(album);
            music.setGenre(genre);

            musicRepository.save(music);

            return ResponseEntity.ok("Music successfully updated");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload files");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMusic(@PathVariable Long id) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music == null) {
            return ResponseEntity.notFound().build();
        }
        musicRepository.delete(music);
        return ResponseEntity.ok("Music successfully deleted");
    }

    private String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        Path uploadPath = Paths.get(FILE_UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);

        return filename;
    }
}