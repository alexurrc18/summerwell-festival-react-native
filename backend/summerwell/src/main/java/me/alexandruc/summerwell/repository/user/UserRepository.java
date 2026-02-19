package me.alexandruc.summerwell.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.user.User;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAll();

    Optional<User> findByEmail(String email);

    
}
