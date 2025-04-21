package com.jcode.hometogo.Repository;

import com.jcode.hometogo.Model.Booking;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {



    @EntityGraph(attributePaths = {
        "tenant.user", 
        "property.host.user"
    })
    List<Booking> findByProperty_Id(Long propertyId);  
    //List<Booking> findByPropertyId(Long propertyId);
    List<Booking> findByTenant_Id(Long tenantId);   






    @Query("""
    SELECT b FROM Booking b
    JOIN FETCH b.tenant t
    JOIN FETCH t.user
    JOIN FETCH b.property p
    JOIN FETCH p.host h
    JOIN FETCH h.user
    WHERE p.id = :propertyId
""")
List<Booking> findAllByPropertyIdWithNames(@Param("propertyId") Long propertyId);



}
