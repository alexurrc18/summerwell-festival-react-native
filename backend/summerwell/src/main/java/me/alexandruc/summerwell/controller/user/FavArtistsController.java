package me.alexandruc.summerwell.controller.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.dto.user.FavArtistsData;
import me.alexandruc.summerwell.entity.user.User;
import me.alexandruc.summerwell.repository.user.UserRepository;
import me.alexandruc.summerwell.service.user.FavArtistsService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/v1/user/favorites/artists")
@AllArgsConstructor
public class FavArtistsController {
    private final FavArtistsService favArtistsService;
    private final UserRepository userRepository;

    @PostMapping("/toggle/{artistId}")
    public ResponseEntity<Void> toggleFavArtist(@PathVariable("artistId") Long artistId, Authentication authentication) {

        favArtistsService.toggleFavArtist(authentication.getName(), artistId);

        return ResponseEntity.ok().build();
    }

    private Map<String, Object> favArtistsResponse(List<FavArtistsData> favArtists) {
        return new HashMap<>() {
            {
                put("fav_artists", favArtists);
            }
        };
    }

    @GetMapping
    public ResponseEntity<?> getFavArtists(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found."));

        List<FavArtistsData> favArtists = favArtistsService.getFavArtistsByUserId(user.getId())
                .stream()
                .map(favArtist -> new FavArtistsData(favArtist.getArtist()))
                .toList();

        return ResponseEntity.ok(favArtistsResponse(favArtists));
    }

}
