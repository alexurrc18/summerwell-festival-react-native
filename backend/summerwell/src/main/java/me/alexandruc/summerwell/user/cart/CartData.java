package me.alexandruc.summerwell.user.cart;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.alexandruc.summerwell.tickets.Tickets;

@Data
@JsonPropertyOrder({ "userId", "ticketId"})
@AllArgsConstructor
@NoArgsConstructor
public class CartData {

    private Tickets ticket;
    
}
