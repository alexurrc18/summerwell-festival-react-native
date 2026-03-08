package me.alexandruc.summerwell.user.tickets;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTicketsData {
    private Long userId;
    private Long ticketId;
    
    private String ticketName;
    private String ticketType;
    private String ticketColor;
    private Integer ticketYear;
    
    private String ticketCode;
    private String wristbandCode;
    private String wristbandPin;
    private BigDecimal price;
    private String purchaseDate;
    private Boolean isScanned;
}