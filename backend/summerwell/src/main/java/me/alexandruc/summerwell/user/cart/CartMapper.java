package me.alexandruc.summerwell.user.cart;

import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    public CartData toData(Cart entity) {
        CartData data = new CartData();
        data.setTicket(entity.getTicket());
        return data;
    }
    
}
