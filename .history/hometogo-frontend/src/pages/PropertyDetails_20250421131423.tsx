import React, { use, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import AddListingButton from '@/components/custom/AddListingButton';
import { Button } from '@/components/ui/button';
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

      {!showForm ? (
        <AddListingButton onClick={() => setShowForm(true)} />
      ) : (
        <form className="mt-4 space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input type="text" className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input type="text" className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea className="mt-1 block w-full border rounded p-2"></textarea>
          </div>
          <Button></Button>
        </form>
      )}
      
    </div>
    
  );
}

export default PropertyDetails