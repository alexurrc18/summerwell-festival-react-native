package me.alexandruc.summerwell.user.tickets;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import me.alexandruc.summerwell.tickets.Tickets;
import me.alexandruc.summerwell.user.core.User;

@Entity
@Table(name="users_tickets")
@Data
public class UserTickets {

    @EmbeddedId
    private TicketsId id;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "ticket_type_id", insertable = false, updatable = false)
    private Tickets ticket;

    @Column(name = "ticket_code", nullable = true)
    private String ticketCode;

    @Column(name = "wristband_code", nullable = true)
    private String wristbandCode;

    @Column(name = "wristband_pin", nullable = true)
    private String wristbandPin;

    @Column(name = "balance", nullable = false)
    private BigDecimal price;

    @Column(name = "purchase_date", nullable = false)
    private String purchaseDate;

    @Column(name = "is_scanned", nullable = false)
    private Boolean isScanned;
}