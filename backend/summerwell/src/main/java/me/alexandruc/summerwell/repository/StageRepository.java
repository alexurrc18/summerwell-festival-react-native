package me.alexandruc.summerwell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.Stage;

import java.util.List;


public interface StageRepository extends JpaRepository<Stage, Long> {

    List<Stage> findAllByPublished(Boolean published);
    
    
}
