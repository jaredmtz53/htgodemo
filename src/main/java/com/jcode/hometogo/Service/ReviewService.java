package com.jcode.hometogo.Service;
import com.jcode.hometogo.Model.*;
import com.jcode.hometogo.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
  private final ReviewRepository reviewRepo;
  private final UserRepository userRepo;
  private final PropertyRepository propertyRepo;
  private final HostRepository hostRepo;
  private final TenantRepository tenantRepo;







  public Review createReview(Review review, Long reviewerId, Long hostId, Long tenantId, Long propertyId) {
    User reviewer = userRepo.findById(reviewerId).orElseThrow();
    review.setReviewer(reviewer);

    if (hostId != null) {
        Host host = hostRepo.findById(hostId).orElseThrow();
        review.setHostTarget(host);
    }

    if (tenantId != null) {
        Tenant tenant = tenantRepo.findById(tenantId).orElseThrow();
        review.setTenantTarget(tenant);
    }

    if (propertyId != null) {
        Property property = propertyRepo.findById(propertyId).orElseThrow();
        review.setPropertyTarget(property);
    }

    return reviewRepo.save(review);
}




public List<Review> getAllReviews() {
    return reviewRepo.findAll();
}





public List<Review> getReviewsForHost(Long hostId) {
    Host host = hostRepo.findById(hostId).orElseThrow();
    return reviewRepo.findByHostTarget(host);
}

public List<Review> getReviewsForTenant(Long tenantId) {
    Tenant tenant = tenantRepo.findById(tenantId).orElseThrow();
    return reviewRepo.findByTenantTarget(tenant);
}

public List<Review> getReviewsForProperty(Long propertyId) {
    Property property = propertyRepo.findById(propertyId).orElseThrow();
    return reviewRepo.findByPropertyTarget(property);
}

public void deleteReview(Long id) {
    reviewRepo.deleteById(id);
}


}
