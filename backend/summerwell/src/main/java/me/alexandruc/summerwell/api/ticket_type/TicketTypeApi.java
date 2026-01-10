package me.alexandruc.summerwell.api.ticket_type;

import me.alexandruc.summerwell.core.ticket_type.TicketTypeService;
import me.alexandruc.summerwell.core.ticket_type.TicketTypeRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/api/v1/public/ticket-types")
@RequiredArgsConstructor
public class TicketTypeApi {
    
    private final TicketTypeService ticketTypeService;
    private final TicketTypeMapper ticketTypeMapper;
    private final TicketTypeRepository ticketTypeRepository;


    private Map<String, Object> ticketTypesResponse(List<TicketTypeData> tickets) {
        return new HashMap<>() {{
            put("ticket_types", tickets);
        }};
    }

    private Map<String, Object> ticketTypeResponse(TicketTypeData ticket) {
        return new HashMap<>() {{
            put("ticket_type", ticket);
        }};
    }


    @GetMapping
    public ResponseEntity<?> getTicketTypes() {
        List<TicketTypeData> tickets = ticketTypeService.getAllTickets().stream()
                .map(ticketTypeMapper::toData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ticketTypesResponse(tickets));

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketType(@PathVariable Long id) {
        return ticketTypeRepository.findById(id)
                .map(ticketTypeMapper::toData)
                .map(data -> ResponseEntity.ok(ticketTypeResponse(data)))
                .orElse(ResponseEntity.notFound().build());
    }



}
