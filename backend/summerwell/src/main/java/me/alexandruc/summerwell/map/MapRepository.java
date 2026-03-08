package me.alexandruc.summerwell.map;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MapRepository extends JpaRepository<Map, Long> {

    List<Map> findByPublishedTrue();
    
    
}
