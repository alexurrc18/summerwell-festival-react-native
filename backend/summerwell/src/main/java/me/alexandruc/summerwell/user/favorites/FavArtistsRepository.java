package me.alexandruc.summerwell.user.favorites;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.artist.Artist;
import me.alexandruc.summerwell.user.core.User;

import java.util.List;


public interface FavArtistsRepository extends JpaRepository<FavArtists, FavArtistsId> {

    List<FavArtists> findByUserId(Long userId);

    boolean existsByUserAndArtist(User user, Artist artist);
    void deleteByUserAndArtist(User user, Artist artist);

    
}
