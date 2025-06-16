package org.DeliveryMatch.DeliveryMatchBackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateParcelRequestDTO {
    private Long tripId;
    private String dimensions;
    private Double weight;
    private String type;
}
