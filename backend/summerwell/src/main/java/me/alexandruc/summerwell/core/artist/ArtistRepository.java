package me.alexandruc.summerwell.core.artist;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    List<Artist> findAllByPublished(Boolean published);

    List<Artist> findAllByPublishedAndDayNumber(Boolean published, Integer dayNumber);
    
    List<Artist> findAllByPublishedAndStageId(Boolean published, Long stageId);

    
} 
