package org.DeliveryMatch.DeliveryMatchBackend.Repositories;

import org.DeliveryMatch.DeliveryMatchBackend.entities.ParcelRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParcelRequestRepository extends JpaRepository<ParcelRequest, Long> {
    List<ParcelRequest> findBySenderId(Long senderId);
    List<ParcelRequest> findByTripId(Long tripId);
}

