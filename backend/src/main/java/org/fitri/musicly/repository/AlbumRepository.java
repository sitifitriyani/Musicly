package org.fitri.musicly.repository;

import org.fitri.musicly.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long>{
    
}
