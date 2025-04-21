package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Review;
import com.jcode.hometogo.Service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Review createReview(@RequestBody Review review,@RequestParam Long reviewerId, @RequestParam(required = false) Long hostId,@RequestParam(required = false) Long tenantId,@RequestParam(required = false) Long propertyId) {
        return reviewService.createReview(review, reviewerId, hostId, tenantId, propertyId);
    }



    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }




    @GetMapping("/host/{hostId}")
    public List<Review> getHostReviews(@PathVariable Long hostId) {
        return reviewService.getReviewsForHost(hostId);
    }

    
    @GetMapping("/tenant/{tenantId}")
    public List<Review> getTenantReviews(@PathVariable Long tenantId) {
        return reviewService.getReviewsForTenant(tenantId);
    }



    @GetMapping("/property/{propertyId}")
    public List<Review> getPropertyReviews(@PathVariable Long propertyId) {
        return reviewService.getReviewsForProperty(propertyId);
    }




    
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }

}
