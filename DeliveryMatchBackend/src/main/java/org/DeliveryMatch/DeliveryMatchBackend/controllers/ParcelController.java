package org.DeliveryMatch.DeliveryMatchBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateParcelRequestDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.ParcelRequestDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Services.ParcelService;
import org.DeliveryMatch.DeliveryMatchBackend.Services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ParcelController {
    private final ParcelService parcelService;
    private final UserService userService; // Add UserService dependency

    @PostMapping("/send")
    @PreAuthorize("hasAuthority('EXPEDITEUR')")
    public ParcelRequestDTO sendRequest(Authentication authentication, @RequestBody CreateParcelRequestDTO dto) throws Throwable {
        String email = authentication.getName();
        Long userId = userService.getUserIdByEmail(email); // Get user ID from email
        return parcelService.sendRequest(userId, dto);
    }

    @GetMapping("/sender")
    @PreAuthorize("hasAnyAuthority('CONDUCTEUR', 'EXPEDITEUR')")
    public List<ParcelRequestDTO> getRequests(Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserIdByEmail(email); // Get user ID from email
        return parcelService.getRequestsBySender(userId);
    }

    @PutMapping("/accept/{requestId}")
    @PreAuthorize("hasAuthority('CONDUCTEUR')")
    public ParcelRequestDTO accept(@PathVariable Long requestId) throws Throwable {
        return parcelService.acceptRequest(requestId);
    }

    @PutMapping("/refuse/{requestId}")
    @PreAuthorize("hasAuthority('CONDUCTEUR')")
    public ParcelRequestDTO refuse(@PathVariable Long requestId) throws Throwable {
        return parcelService.refuseRequest(requestId);
    }
}