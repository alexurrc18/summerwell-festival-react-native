package me.alexandruc.summerwell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    List<Artist> findAllByPublished(Boolean published);

    List<Artist> findAllByPublishedAndDayNumber(Boolean published, Integer dayNumber);
    
    List<Artist> findAllByPublishedAndStageId(Boolean published, Long stageId);

    
} 
