package com.jcode.hometogo.Service;

import com.jcode.hometogo.Model.Booking;
import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Model.Tenant; 
import com.jcode.hometogo.Repository.BookingRepository;
import com.jcode.hometogo.Repository.HostRepository;
import com.jcode.hometogo.Repository.PropertyRepository; 
import com.jcode.hometogo.Repository.TenantRepository; 
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository; 
    private final TenantRepository tenantRepository; 


    public List<Booking> getBookingsByPropertyId(Long propertyId) {
        return bookingRepository.findByProperty_Id(propertyId);
    }

    public Booking createBooking(Booking bookingData) {
        Long tenantId = bookingData.getTenantId();
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
    
        
        Booking savedBooking = bookingRepository.save(booking);
    
        savedBooking.setTenantId(tenantId);
        savedBooking.setPropertyId(propertyId);
    
        return savedBooking;
    }
    
    

    public List<Booking> getBookingsByTenantId(Long tenantId) {
        return bookingRepository.findByTenant_Id(tenantId);
    }
    

}