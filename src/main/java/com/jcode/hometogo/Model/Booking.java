package com.jcode.hometogo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    private boolean booked;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    @JsonBackReference("tenant-booking")
    private Tenant tenant;

    @ManyToOne
    @JoinColumn(name = "property_id")
    @JsonBackReference("property-booking")
    private Property property;

    
    @Transient
    private Long tenantId;

    @Transient
    private Long propertyId;
}
