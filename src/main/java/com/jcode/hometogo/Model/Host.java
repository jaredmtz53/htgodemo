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
public class Host {
    // Id setup
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String hostBio;

    // link classes
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference("host-user")
    private User user;

    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL)
    @JsonBackReference("host-property")
    private List<Property> properties;

}
