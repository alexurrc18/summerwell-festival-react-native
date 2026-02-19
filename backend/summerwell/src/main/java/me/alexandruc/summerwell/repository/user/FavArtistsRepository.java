package me.alexandruc.summerwell.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.Artist;
import me.alexandruc.summerwell.entity.user.FavArtists;
import me.alexandruc.summerwell.entity.user.FavArtistsId;
import me.alexandruc.summerwell.entity.user.User;

import java.util.List;


public interface FavArtistsRepository extends JpaRepository<FavArtists, FavArtistsId> {

    List<FavArtists> findByUserId(Long userId);

    boolean existsByUserAndArtist(User user, Artist artist);
    void deleteByUserAndArtist(User user, Artist artist);

    
}
