package me.alexandruc.summerwell.api.auth;

import me.alexandruc.summerwell.core.auth.VerificationToken;
import me.alexandruc.summerwell.core.auth.VerificationTokenRepository;
import me.alexandruc.summerwell.core.user.User;
import me.alexandruc.summerwell.core.user.UserRepository;
import me.alexandruc.summerwell.security.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.lang.Math;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final VerificationTokenRepository tokenRepository;

    private String generatePin() {
        int randomNumber = (int) (Math.random() * 1000001);
        return String.format("%06d", randomNumber);
    }

    @PostMapping("/login-request")
    public ResponseEntity<?> requestPin(@RequestParam("email") String email) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    return userRepository.save(newUser);
                });

        String pin = generatePin();

        VerificationToken token = tokenRepository.findByUser(user).orElse(null);

        if (token == null) {
            token = new VerificationToken(user, pin, LocalDateTime.now().plusMinutes(15));
        } else {
            if (token.getExpiryDate().isAfter(token.getExpiryDate().plusMinutes(1))) {
                token.setToken(pin);
                token.setExpiryDate(LocalDateTime.now().plusMinutes(15));
            } else {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body("A PIN has already been sent. Please wait before requesting a new one.");
            }
        }

        tokenRepository.save(token);

        System.out.println("[DEBUG] Access PIN: " + email + " - " + pin);

        return ResponseEntity.ok("[✓] PIN sent to email.");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPin(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        VerificationToken token = tokenRepository.findByUserAndToken(user, request.pin())
                .orElse(null);

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid PIN.");
        }

        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("PIN Expired.");
        }

        String jwt = jwtUtil.generateToken(user.getEmail());
        tokenRepository.delete(token);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    record LoginRequest(String email, String pin) {
    }

    record AuthResponse(String token) {
    }
}