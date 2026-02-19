package me.alexandruc.summerwell.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.user.Cart;
import me.alexandruc.summerwell.entity.user.CartId;

public interface CartRepository extends JpaRepository<Cart, CartId> {

    List<Cart> findByUserId(Long userId);
    
}
