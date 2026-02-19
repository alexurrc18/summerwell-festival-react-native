package me.alexandruc.summerwell.mapper.user;

import org.springframework.stereotype.Component;

import me.alexandruc.summerwell.dto.user.CartData;
import me.alexandruc.summerwell.entity.user.Cart;

@Component
public class CartMapper {

    public CartData toData(Cart entity) {
        CartData data = new CartData();
        data.setTicket(entity.getTicket());
        return data;
    }
    
}
