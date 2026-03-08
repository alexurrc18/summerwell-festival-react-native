package me.alexandruc.summerwell.user.tickets;

import org.springframework.stereotype.Component;

@Component
public class UserTicketsMapper {

    public UserTicketsData toDto(UserTickets entity) {
        UserTicketsData ticket = new UserTicketsData();
        
        ticket.setUserId(entity.getId().getUserId());
        ticket.setTicketId(entity.getId().getTicketTypeId());
        
        ticket.setTicketName(entity.getTicket().getName());
        ticket.setTicketType(entity.getTicket().getType());
        ticket.setTicketColor(entity.getTicket().getColor());
        ticket.setTicketYear(entity.getTicket().getYear());
        
        ticket.setTicketCode(entity.getTicketCode());
        ticket.setWristbandCode(entity.getWristbandCode());
        ticket.setWristbandPin(entity.getWristbandPin());
        ticket.setPrice(entity.getPrice());
        ticket.setPurchaseDate(entity.getPurchaseDate());
        ticket.setIsScanned(entity.getIsScanned());
        
        return ticket;
    }
}