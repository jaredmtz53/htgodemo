
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Review = {
  id: number;
  content: string;
  rating: number;
  reviewer?: {
    id: number;
    name?: string;
  };
};

const ViewReviews = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reviews/property/${propertyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">
        Reviews for Property #{propertyId}
      </h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available for this property.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="bg-white p-4 rounded shadow">
              <p className="text-gray-800">{review.content}</p>
              <p className="text-sm text-gray-600">Rating: {review.rating} / 5</p>
              {review.reviewer && (
                <p className="text-xs text-gray-500 mt-1">
                  Reviewer ID: {review.reviewer.id}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewReviews;
