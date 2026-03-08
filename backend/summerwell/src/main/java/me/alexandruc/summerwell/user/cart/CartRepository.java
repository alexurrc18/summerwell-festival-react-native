package me.alexandruc.summerwell.user.cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, CartId> {

    List<Cart> findByUserId(Long userId);
    
}
