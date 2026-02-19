package me.alexandruc.summerwell.entity.user;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import me.alexandruc.summerwell.entity.Artist;

@Entity
@Table(name = "users_fav_artists")
@Data
public class FavArtists {

    @EmbeddedId
    private FavArtistsId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("artistId")
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

}
