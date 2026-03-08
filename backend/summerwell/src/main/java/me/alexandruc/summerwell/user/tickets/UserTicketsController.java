package me.alexandruc.summerwell.user.tickets;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import me.alexandruc.summerwell.user.core.User;
import me.alexandruc.summerwell.user.core.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/tickets")
@RequiredArgsConstructor
public class UserTicketsController {

    private final UserTicketsService userTicketsService;
    private final UserRepository userRepository;
    private final UserTicketsMapper userTicketsMapper;

    @GetMapping
    public ResponseEntity<?> getUserTickets(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found."));

        List<UserTicketsData> tickets = userTicketsService.getUserTicketsByUser(user)
                .stream()
                .map(userTicketsMapper::toDto)
                .toList();

        return ResponseEntity.ok(tickets);
    }
}