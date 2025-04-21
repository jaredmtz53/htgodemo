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
        !showForm ? (
          <AddListingButton onClick={() => setShowForm(true)} />
        ) : (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Add Listing</h2>
            {/* Add your form here */}
            <form>
              <input type="text" placeholder="Title" className="border p-2 w-full mb-2" />
              <textarea placeholder="Description" className="border p-2 w-full mb-2"></textarea>
              Butt
            </form>
          </div>
        )
      }
    </div>
    
  );
}

export default PropertyDetails