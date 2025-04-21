package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Booking;
import com.jcode.hometogo.Service.BookingService;
import com.jcode.hometogo.dto.BookingResponseDTO;
import com.jcode.hometogo.Repository.BookingRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/tenant/{tenantId}")
    public List<Booking> getBookingsByTenantId(@PathVariable Long tenantId) {
        return bookingService.getBookingsByTenantId(tenantId);
    }
    @GetMapping("/property/{propertyId}")
    public List<BookingResponseDTO> getBookingsForProperty(@PathVariable Long propertyId) {
        return bookingService.getBookingsForProperty(propertyId);
   }

}
