package me.alexandruc.summerwell.service.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.Artist;
import me.alexandruc.summerwell.entity.user.FavArtists;
import me.alexandruc.summerwell.entity.user.FavArtistsId;
import me.alexandruc.summerwell.entity.user.User;
import me.alexandruc.summerwell.repository.ArtistRepository;
import me.alexandruc.summerwell.repository.user.FavArtistsRepository;
import me.alexandruc.summerwell.repository.user.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavArtistsService {

    public final FavArtistsRepository favArtistsRepository;

    public final UserRepository userRepository;
    public final ArtistRepository artistRepository;

    public List<FavArtists> getFavArtistsByUserId(long userId) {
        return favArtistsRepository.findByUserId(userId);
    }

    @Transactional
    public void toggleFavArtist(String userEmail, Long artistId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found."));

        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(() -> new RuntimeException("Artist not found."));

        if (favArtistsRepository.existsByUserAndArtist(user, artist)) {
            favArtistsRepository.deleteByUserAndArtist(user, artist);
        } else {
            FavArtists newFav = new FavArtists();
            FavArtistsId id = new FavArtistsId(user.getId(), artist.getId());
            newFav.setId(id);
            newFav.setUser(user);
            newFav.setArtist(artist);

            favArtistsRepository.save(newFav);
        }

    }

}
