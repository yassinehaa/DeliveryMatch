package org.DeliveryMatch.DeliveryMatchBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateTripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.TripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Services.TripService;
import org.DeliveryMatch.DeliveryMatchBackend.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createTrip(Authentication authentication, @RequestBody CreateTripDTO dto) {
        System.out.println("Received create trip request for user: " + authentication.getName() + " with authorities: " + authentication.getAuthorities());
        System.out.println("Trip payload: " + dto);
        try {
            String email = authentication.getName();
            Long userId = userService.getUserIdByEmail(email);
            System.out.println("Fetched userId: " + userId + " for email: " + email);
            TripDTO trip = tripService.createTrip(userId, dto);
            return ResponseEntity.ok(trip);
        } catch (RuntimeException e) {
            System.out.println("Error creating trip: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Throwable e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }

    @GetMapping
    public List<TripDTO> getAll() {
        return tripService.getAllTrips();
    }

    @GetMapping("/search")
    public List<TripDTO> searchTrips(@RequestParam String destination) {
        return tripService.searchTrips(destination);
    }
}