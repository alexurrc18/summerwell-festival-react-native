package me.alexandruc.summerwell.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({ "ticketId", "name", "type", "year", "price", "stock", "color" })
public class TicketsData {
    private String ticketId;
    private String name;
    private String type;
    private Integer year;
    private BigDecimal price;
    private Integer stock;
    private String color;
}
