package org.fitri.musicly.repository;

import org.fitri.musicly.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    
}
