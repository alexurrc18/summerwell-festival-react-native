package me.alexandruc.summerwell.core.tickets;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketsRepository extends JpaRepository<Tickets, Long> {

    List<Tickets> findAllByPublishedAndYear(Boolean published, Integer year);
    
}
