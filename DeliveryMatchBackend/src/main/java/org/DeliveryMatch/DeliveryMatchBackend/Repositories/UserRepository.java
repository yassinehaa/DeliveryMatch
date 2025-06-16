package org.DeliveryMatch.DeliveryMatchBackend.Repositories;

import org.DeliveryMatch.DeliveryMatchBackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

