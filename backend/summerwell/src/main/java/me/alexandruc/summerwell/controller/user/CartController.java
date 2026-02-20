package me.alexandruc.summerwell.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.dto.user.CartData;
import me.alexandruc.summerwell.service.user.CartService;
import me.alexandruc.summerwell.service.user.UserService;

@RestController
@RequestMapping("/api/v1/user/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;
    private final UserService userService; 

    @GetMapping
    public ResponseEntity<?> getCartItems(Authentication authentication) {
        Long userId = getAuthenticatedUserId(authentication);

        var cartItems = cartService.getCartItemsByUserId(userId)
                .stream()
                .flatMap(cartItem -> Collections.nCopies(
                        cartItem.getQuantity(), 
                        new CartData(cartItem.getTicket())
                ).stream())
                .toList();

        return ResponseEntity.ok(cartItems);
    }

@GetMapping("/count")
public ResponseEntity<Integer> getCountCartItems(Authentication authentication) {
    Long userId = getAuthenticatedUserId(authentication);

    var cartItems = cartService.getCartItemsByUserId(userId);
    
    int count = cartItems.stream()
            .mapToInt(item -> item.getQuantity())
            .sum();

    return ResponseEntity.ok(count);
}

    @PostMapping("/add/{ticketId}")
    public ResponseEntity<?> addToCart(Authentication authentication, @PathVariable("ticketId") Long ticketId) {
        Long userId = getAuthenticatedUserId(authentication);
        
        cartService.addToCart(userId, ticketId);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{ticketId}")
    public ResponseEntity<?> removeFromCart(Authentication authentication, @PathVariable("ticketId") Long ticketId) {
        Long userId = getAuthenticatedUserId(authentication);

        cartService.removeFromCart(userId, ticketId);

        return ResponseEntity.ok().build();
    }
    
    private Long getAuthenticatedUserId(Authentication authentication) {
        return userService.getUserIdByEmail(authentication.getName());
    }
}