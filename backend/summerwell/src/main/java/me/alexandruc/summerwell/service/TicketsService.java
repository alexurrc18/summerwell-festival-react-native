package me.alexandruc.summerwell.service;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.Tickets;
import me.alexandruc.summerwell.repository.TicketsRepository;

@Service
@RequiredArgsConstructor
public class TicketsService {
    private final TicketsRepository ticketRepository;

    public List<Tickets> getTicketsByYearIfPublished(Boolean published, Integer year) {
        return ticketRepository.findAllByPublishedAndYear(published, year);
    }
    
}
