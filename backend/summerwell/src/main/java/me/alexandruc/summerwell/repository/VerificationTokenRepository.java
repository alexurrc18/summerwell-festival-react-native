package me.alexandruc.summerwell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.user.User;
import me.alexandruc.summerwell.entity.user.VerificationToken;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByUserAndToken(User user, String token);

    Optional<VerificationToken> findByUser(User user);
}