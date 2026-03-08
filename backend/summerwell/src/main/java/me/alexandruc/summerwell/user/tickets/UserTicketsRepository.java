package me.alexandruc.summerwell.user.tickets;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.alexandruc.summerwell.user.core.User;

@Repository
public interface UserTicketsRepository extends JpaRepository<UserTickets, TicketsId> {
    
    List<UserTickets> findByUser(User user);
    
}