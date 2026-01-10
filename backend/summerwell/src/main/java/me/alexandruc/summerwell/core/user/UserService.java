package me.alexandruc.summerwell.core.user;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }



    
}
