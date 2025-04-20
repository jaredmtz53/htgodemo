package com.jcode.hometogo.Repository;

import com.jcode.hometogo.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByProperty_Id(Long propertyId);  // ✅ fixed
    List<Booking> findByTenant_Id(Long tenantId);      // ✅ correct
}
