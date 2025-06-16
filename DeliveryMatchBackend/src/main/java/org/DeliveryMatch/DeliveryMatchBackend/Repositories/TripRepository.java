package org.DeliveryMatch.DeliveryMatchBackend.Repositories;

import org.DeliveryMatch.DeliveryMatchBackend.entities.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByDestinationContainingIgnoreCase(String destination);
    List<Trip> findByDriverId(Long driverId);
}

