package org.DeliveryMatch.DeliveryMatchBackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User driver;

    private String departure;
    private String destination;

    @ElementCollection
    private List<String> stopovers;

    private String maxDimensions;
    private String merchandiseType;
    private Double availableCapacity;

    private LocalDateTime departureDate;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private List<ParcelRequest> requests;
}
