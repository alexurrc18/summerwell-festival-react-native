package me.alexandruc.summerwell.entity.user;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import me.alexandruc.summerwell.entity.Tickets;

@Entity
@Table(name = "users_cart")
@Data
public class Cart {

    @EmbeddedId
    private CartId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("ticketId")
    @JoinColumn(name = "ticket_id", nullable = false)
    private Tickets ticket;

    @Column(name = "quantity", nullable = false, columnDefinition = "INT DEFAULT 1")
    private Integer quantity;
    
}
