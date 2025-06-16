package org.DeliveryMatch.DeliveryMatchBackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.entities.ParcelStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParcelRequestDTO {
    private Long id;

    private Long senderId;
    private Long tripId;

    private String dimensions;
    private Double weight;
    private String type;

    private ParcelStatus status;
    private LocalDateTime requestDate;
}

