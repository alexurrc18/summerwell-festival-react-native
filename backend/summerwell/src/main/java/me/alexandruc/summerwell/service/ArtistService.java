package me.alexandruc.summerwell.service;

import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.Artist;
import me.alexandruc.summerwell.repository.ArtistRepository;

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