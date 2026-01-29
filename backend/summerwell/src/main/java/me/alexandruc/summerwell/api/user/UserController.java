package me.alexandruc.summerwell.api.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.core.user.User;
import me.alexandruc.summerwell.core.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    
    @RequestMapping("/me")
    public UserData me(Authentication authentication) {
        var user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found."));
        return userMapper.toData(user);
    }

    @PostMapping("/me/updateDetails")
    public ResponseEntity<?> updateDetails(@RequestBody UpdateDetailsRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found."));

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setPhoneNumber(request.phoneNumber());
        user.setCountry(request.country());
        user.setCity(request.city());
        user.setAddress(request.address());

        userRepository.save(user);

        System.out.println( "[DEBUG] Updated user details: " + user );

        return ResponseEntity.ok("User details updated successfully.");
    }


    @PostMapping("/me/deleteAccount")
    public ResponseEntity<?> deleteAccount(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found."));
        userRepository.delete(user);

        return ResponseEntity.ok("User account deleted successfully.");
    }



    record UpdateDetailsRequest( String firstName, String lastName, String phoneNumber, String country,  String city, String address) {

    }
    

}
