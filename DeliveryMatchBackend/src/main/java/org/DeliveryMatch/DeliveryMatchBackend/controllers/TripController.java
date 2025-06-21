package org.DeliveryMatch.DeliveryMatchBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateTripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.TripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Services.TripService;
import org.DeliveryMatch.DeliveryMatchBackend.Services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    private final UserService userService; // Added to fetch userId by email

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('CONDUCTEUR')")
    public TripDTO createTrip(Authentication authentication, @RequestBody CreateTripDTO dto) throws Throwable {
        String email = authentication.getName();
        Long userId = userService.getUserIdByEmail(email); // Fetch userId using email
        return tripService.createTrip(userId, dto);
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