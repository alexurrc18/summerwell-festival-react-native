package me.alexandruc.summerwell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.Map;

import java.util.List;


public interface MapRepository extends JpaRepository<Map, Long> {

    List<Map> findByPublishedTrue();
    
    
}
