package me.alexandruc.summerwell.service.user;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.user.Cart;
import me.alexandruc.summerwell.entity.user.CartId;
import me.alexandruc.summerwell.repository.user.CartRepository;
import me.alexandruc.summerwell.repository.user.UserRepository;
import me.alexandruc.summerwell.repository.TicketsRepository; 

@Service
@RequiredArgsConstructor
public class CartService {
    
    public final CartRepository cartRepository;
    public final UserRepository userRepository;
    public final TicketsRepository ticketsRepository;

    public List<Cart> getCartItemsByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void addToCart(Long userId, Long ticketId) {
        Cart existingTicket = cartRepository.findById(new CartId(userId, ticketId)).orElse(null);

        if(existingTicket != null) {
            existingTicket.setQuantity(existingTicket.getQuantity() + 1);
            cartRepository.save(existingTicket);
        } else {
            Cart newTicket = new Cart();
            CartId id = new CartId(userId, ticketId);
            
            newTicket.setId(id);
            newTicket.setUser(userRepository.getReferenceById(userId));
            newTicket.setTicket(ticketsRepository.getReferenceById(ticketId));
            newTicket.setQuantity(1);
            
            cartRepository.save(newTicket);
        }
    }

    public void removeFromCart(Long userId, Long ticketId) {
        Cart existingTicket = cartRepository.findById(new CartId(userId, ticketId)).orElse(null);

        if(existingTicket != null) {
            if(existingTicket.getQuantity() > 1) {
                existingTicket.setQuantity(existingTicket.getQuantity() - 1);
                cartRepository.save(existingTicket);
            } else {
                cartRepository.delete(existingTicket);
            }
        }
    }
}