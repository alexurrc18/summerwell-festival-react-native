package me.alexandruc.summerwell.core.auth;

import me.alexandruc.summerwell.core.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByUserAndToken(User user, String token);

    Optional<VerificationToken> findByUser(User user);
}