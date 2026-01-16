package me.alexandruc.summerwell.api.artist;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.core.artist.ArtistRepository;
import me.alexandruc.summerwell.core.artist.ArtistService; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/v1/public/artists")
@AllArgsConstructor
public class ArtistController {

    private final ArtistService artistService;
    private final ArtistRepository artistRepository;
    private final ArtistMapper artistMapper;

    @GetMapping
    public ResponseEntity<?> getArtists() {
        List<ArtistData> artists = artistService.getAllArtists().stream()
                .map(artistMapper::toData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(artistsResponse(artists));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtist(@PathVariable("id") Long id) {
        return artistRepository.findById(id)
                .map(artistMapper::toData)
                .map(data -> ResponseEntity.ok(artistResponse(data)))
                .orElse(ResponseEntity.notFound().build()); 
    }

    @GetMapping("/day/{day}")
    public ResponseEntity<?> getArtistsByDay(@PathVariable("day") Integer day) {
        List<ArtistData> artists = artistService.getArtistsByDay(day).stream()
                .map(artistMapper::toData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(artistsResponse(artists));
    }

    private Map<String, Object> artistResponse(ArtistData artistData) {
        return new HashMap<>() {{
            put("artist", artistData);
        }};
    }

    private Map<String, Object> artistsResponse(List<ArtistData> artists) {
        return new HashMap<>() {{
            put("artists", artists);
        }};
    }
}