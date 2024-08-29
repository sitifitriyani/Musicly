package org.fitri.musicly.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
 public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Double duration;

    private Integer year;

    private String songUrl;
    
    private String imageUrl;

    @ManyToOne
     @JoinColumn(name = "album_id", referencedColumnName = "id" )
    private Album album; // Foreign key reference to Album

    @ManyToOne
    @JoinColumn(name = "genre_id", referencedColumnName = "id" )
    private Genre genre; // Foreign key reference to Genre

    public Artist getArtist() {
        return album.getArtist(); // Get Artist through Album
    }
}

