package org.DeliveryMatch.DeliveryMatchBackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTripDTO {
    private String departure;
    private String destination;
    private List<String> stopovers;
    private String maxDimensions;
    private String merchandiseType;
    private Double availableCapacity;
    private LocalDateTime departureDate;
}
