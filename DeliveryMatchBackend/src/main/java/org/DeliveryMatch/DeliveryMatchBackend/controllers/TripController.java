package org.DeliveryMatch.DeliveryMatchBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateTripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.TripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Services.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @PostMapping("/create/{driverId}")
    public TripDTO createTrip(@PathVariable Long driverId, @RequestBody CreateTripDTO dto) throws Throwable {
        return tripService.createTrip(driverId, dto);
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
