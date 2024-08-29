package org.fitri.musicly.repository;

import org.fitri.musicly.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    
}
