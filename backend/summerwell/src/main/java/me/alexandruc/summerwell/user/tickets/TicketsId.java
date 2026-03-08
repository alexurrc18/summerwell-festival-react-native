package me.alexandruc.summerwell.user.tickets;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class TicketsId implements Serializable {
    
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "ticket_type_id")
    private Long ticketTypeId;
}