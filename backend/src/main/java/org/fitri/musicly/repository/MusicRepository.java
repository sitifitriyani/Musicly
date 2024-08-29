package org.fitri.musicly.repository;

import org.fitri.musicly.models.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long>{
    
} 
