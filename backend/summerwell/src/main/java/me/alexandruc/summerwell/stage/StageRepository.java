package me.alexandruc.summerwell.stage;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StageRepository extends JpaRepository<Stage, Long> {

    List<Stage> findAllByPublished(Boolean published);
    
    
}
