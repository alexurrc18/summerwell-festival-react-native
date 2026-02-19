package me.alexandruc.summerwell.controller;

import me.alexandruc.summerwell.dto.TicketsData;
import me.alexandruc.summerwell.mapper.TicketsMapper;
import me.alexandruc.summerwell.repository.TicketsRepository;
import me.alexandruc.summerwell.service.AppSettingsService;
import me.alexandruc.summerwell.service.TicketsService;

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
public class TicketsController {
    
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
