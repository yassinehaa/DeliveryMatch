package org.DeliveryMatch.DeliveryMatchBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateParcelRequestDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.ParcelRequestDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Services.ParcelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parcels")
@RequiredArgsConstructor
public class ParcelController {
    private final ParcelService parcelService;

    @PostMapping("/send/{senderId}")
    public ParcelRequestDTO sendRequest(@PathVariable Long senderId, @RequestBody CreateParcelRequestDTO dto) throws Throwable {
        return parcelService.sendRequest(senderId, dto);
    }

    @GetMapping("/sender/{senderId}")
    public List<ParcelRequestDTO> getRequests(@PathVariable Long senderId) {
        return parcelService.getRequestsBySender(senderId);
    }

    @PutMapping("/accept/{requestId}")
    public ParcelRequestDTO accept(@PathVariable Long requestId) throws Throwable {
        return parcelService.acceptRequest(requestId);
    }

    @PutMapping("/refuse/{requestId}")
    public ParcelRequestDTO refuse(@PathVariable Long requestId) throws Throwable {
        return parcelService.refuseRequest(requestId);
    }
}

