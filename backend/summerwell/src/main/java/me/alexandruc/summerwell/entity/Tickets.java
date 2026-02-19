package me.alexandruc.summerwell.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tickets")
@Data
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id", nullable = false)
    private Long ticketId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "price", nullable = true)
    private BigDecimal price;

    @Column(name = "stock", nullable = true)
    private Integer stock;

    @Column(name = "color", nullable = false)
    private String color;
    
    @Column(name = "published", nullable = false)
    private Boolean published;
}