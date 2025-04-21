import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
function PropertyDetails() {
   const { id } = useParams();
  const [property, setProperty] = React.useState(null);
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
   
  );
}

export default PropertyDetails