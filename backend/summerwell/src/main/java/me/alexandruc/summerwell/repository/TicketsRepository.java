package me.alexandruc.summerwell.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.Tickets;

public interface TicketsRepository extends JpaRepository<Tickets, Long> {

    List<Tickets> findAllByPublishedAndYear(Boolean published, Integer year);
    
}
