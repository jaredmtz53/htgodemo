package com.jcode.hometogo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tenantBio;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference("tenant-user")  
    private User user;

    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL)
    @JsonManagedReference("tenant-booking")
    private List<Booking> bookings;
}
