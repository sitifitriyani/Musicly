package org.fitri.musicly.repository;

import java.util.List;

import org.fitri.musicly.models.Genre;
import org.fitri.musicly.models.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long>{
    List<Music> findMusicByGenre(Genre genre);
} 
