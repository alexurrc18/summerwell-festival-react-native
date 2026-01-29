package me.alexandruc.summerwell.api.tickets;

import org.springframework.stereotype.Component;

import me.alexandruc.summerwell.core.tickets.Tickets;

@Component
public class TicketsMapper {
    public TicketsData toData(Tickets ticketType) {
        if (ticketType == null) return null;

        TicketsData data = new TicketsData();
        data.setTicketId(ticketType.getTicketId().toString());
        data.setName(ticketType.getName());
        data.setType(ticketType.getType());
        data.setYear(ticketType.getYear());
        data.setPrice(ticketType.getPrice());
        data.setStock(ticketType.getStock());
        data.setColor(ticketType.getColor());

        return data;
    }
}
