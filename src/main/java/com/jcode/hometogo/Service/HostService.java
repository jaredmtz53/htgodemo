package com.jcode.hometogo.Service;

import com.jcode.hometogo.Model.Booking;
import com.jcode.hometogo.Model.Host;
import com.jcode.hometogo.Model.Property;
import com.jcode.hometogo.Model.User;
import com.jcode.hometogo.Repository.BookingRepository;
import com.jcode.hometogo.Repository.HostRepository;
import com.jcode.hometogo.Repository.PropertyRepository;
import com.jcode.hometogo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HostService {
    private final HostRepository hostRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;
    public List<Property> getAllProperties(Long hostId) {
        return hostRepository.findById(hostId)
                .map(host -> host.getProperties())
                .orElseThrow(() -> new RuntimeException("Host not found with id " + hostId));
    }


    public Property addPropertyToHost(Long hostId, Property property) {
        Host host = hostRepository.findById(hostId)
                .orElseThrow(() -> new RuntimeException("Host not found with id " + hostId));

        property.setHost(host);
        host.getProperties().add(property);

        Property savedProperty = hostRepository.save(host).getProperties()
                .stream()
                .filter(p -> p.getTitle().equals(property.getTitle()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Saved property not found"));

        // 🔥 Generate 30 available booking slots
        for (int i = 0; i < 30; i++) {
            Booking booking = new Booking();
            booking.setStartDate(LocalDate.now().plusDays(i));
            booking.setEndDate(LocalDate.now().plusDays(i + 1));
            booking.setBooked(false);
            booking.setProperty(savedProperty);

            bookingRepository.save(booking);
        }

        return savedProperty;
    }
    public void deletePropertyFromHost(Long hostId, Long propertyId) {
        Host host = hostRepository.findById(hostId)
                .orElseThrow(() -> new RuntimeException("Host not found with id " + hostId));
    
        Property propertyToRemove = host.getProperties().stream()
                .filter(prop -> prop.getId().equals(propertyId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Property not found with id " + propertyId));
    
        host.getProperties().remove(propertyToRemove);
        hostRepository.save(host);
        
        // Explicitly delete from PropertyRepository
        propertyRepository.delete(propertyToRemove);
    }

    /// Crud

    public Host createHost(Long userId, Host hostData) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        if (user.getHost() != null) {
            throw new RuntimeException("User is already a host.");
        }
        hostData.setUser(user);
        return hostRepository.save(hostData);
    }

    public Host getHostById(Long hostId) {
        return hostRepository.findById(hostId)
                .orElseThrow(() -> new RuntimeException("Host not found with id " + hostId));
    }
    public List<Host> getAllHosts() {
        return hostRepository.findAll();
    }


}
