package com.jcode.hometogo.Service;

import com.jcode.hometogo.Model.Booking;
import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Model.Tenant; // Added import for Tenant
import com.jcode.hometogo.Repository.BookingRepository;
import com.jcode.hometogo.Repository.HostRepository;
import com.jcode.hometogo.Repository.PropertyRepository; // Added import for PropertyRepository
import com.jcode.hometogo.Repository.TenantRepository; // Added import for TenantRepository
import com.jcode.hometogo.dto.BookingResponseDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository; // Injected PropertyRepository
    private final TenantRepository tenantRepository; // Injected TenantRepository


    public List<Booking> getBookingsByPropertyId(Long propertyId) {
        return bookingRepository.findByProperty_Id(propertyId);
    }

    public Booking createBooking(Booking bookingData) {
        // Use bookingData.getTenantId() for now
        Long tenantId = bookingData.getTenantId(); // later: get from logged-in user
        Long propertyId = bookingData.getPropertyId();
    
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
    
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
    
        Booking booking = new Booking();
        booking.setStartDate(bookingData.getStartDate());
        booking.setEndDate(bookingData.getEndDate());
        booking.setTenant(tenant);
        booking.setProperty(property);
        booking.setBooked(true);
    
        return bookingRepository.save(booking);
    }
    
    

    public List<Booking> getBookingsByTenantId(Long tenantId) {
        return bookingRepository.findByTenant_Id(tenantId);
    }
  
    public List<BookingResponseDTO> getBookingsForProperty(Long propertyId) {
        List<Booking> bookings = bookingRepository.findAllByPropertyIdWithNames(propertyId);
        return bookings.stream().map(BookingResponseDTO::new).toList();
    }
    
    

}
