package me.alexandruc.summerwell.user.tickets;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.user.core.User;

@Service
@RequiredArgsConstructor
public class UserTicketsService {

    private final UserTicketsRepository userTicketsRepository;

    public List<UserTickets> getUserTicketsByUser(User user) {
        return userTicketsRepository.findByUser(user);
    }
}