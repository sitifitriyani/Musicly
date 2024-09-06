package org.fitri.musicly.controllers;

// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
import java.util.List;

import org.fitri.musicly.models.Music;
// import org.fitri.musicly.repository.AlbumRepository;
// import org.fitri.musicly.repository.GenreRepository;
import org.fitri.musicly.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true",allowPrivateNetwork = "true")
@RestController
@RequestMapping("/api/music")
public class MusicController {

    @Autowired
    private MusicRepository musicRepository;

    // private static final String FILE_UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Music> getAllMusics() {
        return musicRepository.findAll();
    }

    @PostMapping
    public Music createMusic(@RequestBody Music music) {
        return musicRepository.save(music);
    }

    @PutMapping("/{id}")
    public Music updateMusic(@PathVariable Long id, @RequestBody Music musicDetail) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music != null) {
            music.setTitle(musicDetail.getTitle());
            music.setDuration(musicDetail.getDuration());
            music.setAlbum(musicDetail.getAlbum());
            music.setGenre(musicDetail.getGenre());
            music.setSongUrl(musicDetail.getSongUrl());
            music.setImageUrl(musicDetail.getImageUrl());
            return musicRepository.save(music);
        }
        return null;
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

@GetMapping("/{id}/audio")
    public ResponseEntity<byte[]> getAudio(@PathVariable Long id) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(music.getSongUrl().getBytes());
        }
        return ResponseEntity.notFound().build();
    }
    // private String uploadFile(MultipartFile file) throws IOException {
    // if (file == null || file.isEmpty()) {
    // return null;
    // }

    // Path uploadPath = Paths.get(FILE_UPLOAD_DIR);
    // if (!Files.exists(uploadPath)) {
    // Files.createDirectories(uploadPath);
    // }

    // String filename = file.getOriginalFilename();
    // Path filePath = uploadPath.resolve(filename);
    // Files.copy(file.getInputStream(), filePath);

    // return filename;
    // }
}