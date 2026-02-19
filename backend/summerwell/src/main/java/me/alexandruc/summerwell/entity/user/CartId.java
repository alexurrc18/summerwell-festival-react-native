package me.alexandruc.summerwell.entity.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartId implements java.io.Serializable {
    private Long userId;
    private Long ticketId;
}
