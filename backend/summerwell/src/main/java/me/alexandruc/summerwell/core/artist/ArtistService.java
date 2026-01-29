package me.alexandruc.summerwell.core.artist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;

    public List<Artist> getAllByPublished(Boolean published) {
        return artistRepository.findAllByPublished(published);
    }
    
    public List<Artist> getArtistsByPublishedAndDay(Integer day) {
        return artistRepository.findAllByPublishedAndDayNumber(true, day);
    }
}