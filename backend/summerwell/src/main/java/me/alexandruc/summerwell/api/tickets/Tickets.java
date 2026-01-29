package me.alexandruc.summerwell.api.tickets;

import me.alexandruc.summerwell.core.tickets.TicketsService;
import me.alexandruc.summerwell.api.app_settings.AppSettingsData;
import me.alexandruc.summerwell.core.app_settings.AppSettingsService;
import me.alexandruc.summerwell.core.tickets.TicketsRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/api/v1/public/tickets")
@RequiredArgsConstructor
public class Tickets {
    
    private final TicketsService ticketsService;
    private final TicketsMapper ticketsMapper;
    private final TicketsRepository ticketsRepository;
    private final AppSettingsService appSettingsService;


    private Map<String, Object> ticketsResponse(List<TicketsData> tickets) {
        return new HashMap<>() {{
            put("tickets", tickets);
        }};
    }

    private Map<String, Object> ticketsResponse(TicketsData ticket) {
        return new HashMap<>() {{
            put("tickets", ticket);
        }};
    }


    @GetMapping
    public ResponseEntity<?> getTickets() {
        List<TicketsData> tickets = ticketsService.getTicketsByYearIfPublished(true, appSettingsService.getCurrentEditionYear()).stream()
                .map(ticketsMapper::toData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ticketsResponse(tickets));

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTickets(@PathVariable Long id) {
        return ticketsRepository.findById(id)
                .map(ticketsMapper::toData)
                .map(data -> ResponseEntity.ok(ticketsResponse(data)))
                .orElse(ResponseEntity.notFound().build());
    }



}
