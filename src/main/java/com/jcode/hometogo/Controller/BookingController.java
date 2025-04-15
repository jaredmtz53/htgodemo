package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Booking;
import com.jcode.hometogo.Service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    @GetMapping("/{propertyId}")
    public List<Booking> getAllBookings(@PathVariable Long propertyId) {
        return bookingService.getBookingsByPropertyId(propertyId);
    }
}
