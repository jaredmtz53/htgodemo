package com.jcode.hometogo.Repository;
import com.jcode.hometogo.Model.Review;
import com.jcode.hometogo.Model.Host;
import com.jcode.hometogo.Model.Tenant;
import com.jcode.hometogo.Model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ReviewRepository extends JpaRepository <Review, Long> {


    //Cannot use the jpa mehthods since we are using long for the id 
    List<Review> findByHostTarget(Host host);
    List<Review> findByTenantTarget(Tenant tenant);
    List<Review> findByPropertyTarget(Property property);

}
