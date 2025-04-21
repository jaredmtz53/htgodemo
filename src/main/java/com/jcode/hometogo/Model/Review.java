package com.jcode.hometogo.Model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private int rating;
    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User reviewer;
    @ManyToOne
    @JoinColumn(name = "host_id", nullable = true)
    private Host hostTarget;
    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = true)
    private Tenant tenantTarget;
    @ManyToOne
    @JoinColumn(name = "property_id", nullable = true)
    private Property propertyTarget;
}