package me.alexandruc.summerwell.dto.user;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.alexandruc.summerwell.entity.Tickets;

@Data
@JsonPropertyOrder({ "userId", "ticketId"})
@AllArgsConstructor
@NoArgsConstructor
public class CartData {

    private Tickets ticket;
    
}
