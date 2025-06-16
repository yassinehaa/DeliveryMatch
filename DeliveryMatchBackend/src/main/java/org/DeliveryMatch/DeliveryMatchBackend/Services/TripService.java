package org.DeliveryMatch.DeliveryMatchBackend.Services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.CreateTripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.TripDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.TripRepository;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.UserRepository;
import org.DeliveryMatch.DeliveryMatchBackend.entities.Trip;
import org.DeliveryMatch.DeliveryMatchBackend.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public TripDTO createTrip(Long driverId, CreateTripDTO dto) throws Throwable {
        User driver = (User) userRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Trip trip = Trip.builder()
                .driver(driver)
                .departure(dto.getDeparture())
                .destination(dto.getDestination())
                .stopovers(dto.getStopovers())
                .maxDimensions(dto.getMaxDimensions())
                .merchandiseType(dto.getMerchandiseType())
                .availableCapacity(dto.getAvailableCapacity())
                .departureDate(dto.getDepartureDate())
                .build();

        return modelMapper.map(tripRepository.save(trip), TripDTO.class);
    }

    public List<TripDTO> getAllTrips() {
        return tripRepository.findAll()
                .stream()
                .map(trip -> modelMapper.map(trip, TripDTO.class))
                .collect(Collectors.toList());
    }

    public List<TripDTO> searchTrips(String destination) {
        return tripRepository.findByDestinationContainingIgnoreCase(destination)
                .stream()
                .map(trip -> modelMapper.map(trip, TripDTO.class))
                .collect(Collectors.toList());
    }
}

