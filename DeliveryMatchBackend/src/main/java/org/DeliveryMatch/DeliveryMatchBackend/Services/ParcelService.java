package org.DeliveryMatch.DeliveryMatchBackend.Services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateParcelRequestDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.ParcelRequestDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.ParcelRequestRepository;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.TripRepository;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.UserRepository;
import org.DeliveryMatch.DeliveryMatchBackend.entities.ParcelRequest;
import org.DeliveryMatch.DeliveryMatchBackend.entities.ParcelStatus;
import org.DeliveryMatch.DeliveryMatchBackend.entities.Trip;
import org.DeliveryMatch.DeliveryMatchBackend.entities.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParcelService {
    private final ParcelRequestRepository parcelRequestRepository;
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public ParcelRequestDTO sendRequest(Long senderId, CreateParcelRequestDTO dto) throws Throwable {
        User sender = (User) userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        Trip trip = (Trip) tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        ParcelRequest request = ParcelRequest.builder()
                .sender(sender)
                .trip(trip)
                .dimensions(dto.getDimensions())
                .weight(dto.getWeight())
                .type(dto.getType())
                .status(ParcelStatus.EN_ATTENTE)
                .requestDate(LocalDateTime.now())
                .build();

        return modelMapper.map(parcelRequestRepository.save(request), ParcelRequestDTO.class);
    }

    public List<ParcelRequestDTO> getRequestsBySender(Long senderId) {
        return parcelRequestRepository.findBySenderId(senderId)
                .stream()
                .map(req -> modelMapper.map(req, ParcelRequestDTO.class))
                .collect(Collectors.toList());
    }

    public ParcelRequestDTO acceptRequest(Long requestId) throws Throwable {
        ParcelRequest request = (ParcelRequest) parcelRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(ParcelStatus.ACCEPTE);
        return modelMapper.map(parcelRequestRepository.save(request), ParcelRequestDTO.class);
    }

    public ParcelRequestDTO refuseRequest(Long requestId) throws Throwable {
        ParcelRequest request = (ParcelRequest) parcelRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(ParcelStatus.REFUSE);
        return modelMapper.map(parcelRequestRepository.save(request), ParcelRequestDTO.class);
    }
}

