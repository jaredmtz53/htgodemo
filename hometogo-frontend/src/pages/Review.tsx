import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Review components
type ReviewData = {
  content: string;
  rating: number;
  tenantId: number;
  reviewerId: number;
  propertyId: number;
};

// Review function
const Review: React.FC = () => {

  // Initialize review form
  const [review, setReview] = useState<ReviewData>({
    content: "",
    rating: 0,
    tenantId: 0,
    reviewerId: 0,
    propertyId: 0,
  });

  // Hold submitted review
  const [submittedReview, setSubmittedReview] = useState<ReviewData | null>(null);

  // Auto-fill tenantId from localStorage (Tenant ID 2) 
  useEffect(() => {
    const tenantId = Number(localStorage.getItem("tenantId")) || 2;
    setReview((prev) => ({
      ...prev,
      tenantId,
      reviewerId: tenantId,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: name === "rating" || name === "propertyId" ? Number(value) : value,
    });
  };

  // Handles and saves review submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚨 Submitting review:", review);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/reviews?reviewerId=${review.reviewerId}&tenantId=${review.tenantId}&propertyId=${review.propertyId}`,
        {
          content: review.content,
          rating: review.rating,
        }
      );
      console.log("✅ Review created:", res.data);
      setSubmittedReview(res.data);
    } catch (err) {
      console.error("❌ Failed to submit review:", err);
    }
  };


  // Html review form
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Leave a Review</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block mb-1 font-medium">
            Rating (1–5)
          </label>
          <Input
            type="number"
            id="rating"
            name="rating"
            min={1}
            max={5}
            value={review.rating}
            onChange={handleChange}
            required
          />
        </div>

        {/* Review Content */}
        <div>
          <label htmlFor="content" className="block mb-1 font-medium">
            Review
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            placeholder="Write your review here..."
            value={review.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Property ID (user input) */}
        <div>
          <label htmlFor="propertyId" className="block mb-1 font-medium">
            Property ID
          </label>
          <Input
            type="number"
            id="propertyId"
            name="propertyId"
            value={review.propertyId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tenant ID (read-only) */}
        <div>
          <label htmlFor="tenantId" className="block mb-1 font-medium">
            Tenant ID
          </label>
          <Input
            type="number"
            id="tenantId"
            name="tenantId"
            value={review.tenantId}
            readOnly
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </form>

      {submittedReview && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="font-semibold text-lg mb-2 text-center">Review Submitted</h2>
          <p><strong>Rating:</strong> {submittedReview.rating}</p>
          <p><strong>Content:</strong> {submittedReview.content}</p>
          <p><strong>Tenant ID:</strong> {submittedReview.tenantId}</p>
          <p><strong>Property ID:</strong> {submittedReview.propertyId}</p>
        </div>
      )}
    </div>
  );
};

export default Review;
