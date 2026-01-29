package me.alexandruc.summerwell.core.tickets;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketsService {
    private final TicketsRepository ticketRepository;

    public List<Tickets> getTicketsByYearIfPublished(Boolean published, Integer year) {
        return ticketRepository.findAllByPublishedAndYear(published, year);
    }
    
}
