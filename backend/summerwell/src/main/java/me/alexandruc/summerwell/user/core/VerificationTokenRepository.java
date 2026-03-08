package me.alexandruc.summerwell.user.core;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByUserAndToken(User user, String token);

    Optional<VerificationToken> findByUser(User user);
}