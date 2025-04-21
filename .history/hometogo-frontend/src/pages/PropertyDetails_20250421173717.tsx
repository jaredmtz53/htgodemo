import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import AddListingButton from '@/components/custom/AddListingButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function PropertyDetails() {
   const { id } = useParams();
  const [property, setProperty] = React.useState([]);
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

  function handlePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProperty = {
      title: formData.get("title"),
      description: formData.get("description"),
      address: formData.get("address"),
      price: formData.get("price"),
      image: formData.get("image"),
    };

    axios.post(`http://localhost:8080/api/host/${id}/properties`, newProperty)
      .then(res => {
        console.log("Property posted:", res.data);
        setShowForm(false);
      })
      .catch(err => {
        console.error("Failed to post property:", err);
      });
  }
  function handleDelete(propertyId: number) {
    console.log("Deleting property with ID:", propertyId);
    
    axios.delete(`http://localhost:8080/api/host/${id}/properties/${propertyId}`)
      .then(res => {
        console.log("Property deleted:", res.data);
        setProperty(property.filter((property: any) => property.id !== propertyId));
      }
      )
      .catch(err => {
        console.error("Failed to delete property:", err);
      }
      );
  }

  return (
    <div className="p-4">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {property.map((property: any) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>{property.title}</CardTitle>
              <CardDescription>{property.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={property.image} alt="" />
              
            </CardContent>
            <CardFooter className='flex flex-col gap-3.5'>
              <p>{property.address} 📍</p>
              <p>{property.price}$ per night </p>
              <Button onClick={() => handleDelete(property.id)} className='bg-red-500 cursor-pointer hover:bg-red-700'>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {
        !showForm ? (
          <AddListingButton onClick={() => setShowForm(true)} />
        ) : (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Add Listing</h2>
            {/* Add your form here */}
            <form onSubmit={handlePost}>
              <input name="title" type="text" placeholder="Title" className="border p-2 w-full mb-2" />
              <textarea name="description" placeholder="Description" className="border p-2 w-full mb-2"></textarea>
              <input name="address" type="text" placeholder="Address" className="border p-2 w-full mb-2" />
              <input name="price" type="text" placeholder="Price" className="border p-2 w-full mb-2" />
              <input name="image" type="text" placeholder="Image URL" className="border p-2 w-full mb-2" />
              <Button type="submit">Post</Button>
            </form>
          </div>
        )
      }
    </div>
    
  );
}

export default PropertyDetails