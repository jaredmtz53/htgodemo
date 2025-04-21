package com.jcode.hometogo.dto;

import com.jcode.hometogo.Model.Booking;

public class BookingResponseDTO {
    private Long id;
    private String status; // if you have a field for status
    private String startDate;
    private String endDate;

    private String tenantName;
    private String hostName;

    public BookingResponseDTO(Booking b) {
        this.id = b.getId();
        this.startDate = b.getStartDate().toString();
        this.endDate = b.getEndDate().toString();
        this.status = b.isBooked() ? "Confirmed" : "Pending";

        if (b.getTenant() != null && b.getTenant().getUser() != null) {
            this.tenantName = b.getTenant().getUser().getFirstName() + " " +
                              b.getTenant().getUser().getLastName();
        }

        if (b.getProperty() != null && b.getProperty().getHost() != null &&
            b.getProperty().getHost().getUser() != null) {
            this.hostName = b.getProperty().getHost().getUser().getFirstName() + " " +
                            b.getProperty().getHost().getUser().getLastName();
        }
    }

  
}
