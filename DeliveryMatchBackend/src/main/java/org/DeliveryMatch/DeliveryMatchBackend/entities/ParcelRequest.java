package org.DeliveryMatch.DeliveryMatchBackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParcelRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private Trip trip;

    private String dimensions;
    private Double weight;
    private String type;

    @Enumerated(EnumType.STRING)
    private ParcelStatus status;

    private LocalDateTime requestDate;
}

