package me.alexandruc.summerwell.core.user.fav_artists;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.core.artist.Artist;
import me.alexandruc.summerwell.core.user.User;

import java.util.List;


public interface FavArtistsRepository extends JpaRepository<FavArtists, FavArtistsId> {

    List<FavArtists> findByUserId(Long userId);

    boolean existsByUserAndArtist(User user, Artist artist);
    void deleteByUserAndArtist(User user, Artist artist);

    
}
