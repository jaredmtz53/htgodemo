import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import AddListingButton from '@/components/custom/AddListingButton';
function PropertyDetails() {
   const { id } = useParams();
  const [property, setProperty] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/properties/${id}`)
      .then((response) => {
        console.log(response.data);
        setProperty(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });

  }
  , []);
  if (!property) return <div>No properties...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <img src={property.imageUrl} alt={property.title} className="mt-4 w-full max-w-md" />
      <p className="mt-2 text-gray-700">{property.description}</p>
      {/* Add more details as needed */}

      {
        property.reviews && property.reviews.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Reviews</h2>
            {property.reviews.map((review, index) => (
              <div key={index} className="border-b py-2">
                <p className="font-medium">{review.user}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No reviews available.</p>
        )
      }
    </div>
    
  );
}

export default PropertyDetails