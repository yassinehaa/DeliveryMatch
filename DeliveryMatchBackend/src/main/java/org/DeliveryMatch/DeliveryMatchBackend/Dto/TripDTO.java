package org.DeliveryMatch.DeliveryMatchBackend.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class TripDTO {
    private Long id;

    private Long driverId;
    private String departure;
    private String destination;

    private List<String> stopovers;
    private String maxDimensions;
    private String merchandiseType;
    private Double availableCapacity;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime departureDate;
}

