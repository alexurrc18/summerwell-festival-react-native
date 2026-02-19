package me.alexandruc.summerwell.service.user;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.user.User;
import me.alexandruc.summerwell.repository.user.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."))
                .getId();
    }

    
}
