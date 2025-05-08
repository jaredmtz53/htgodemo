import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Landing() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((response) => {
        console.log(response.data);
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {properties.map((property: any) => (
          <Card key={property.id} className="cursor-pointer">
            <CardHeader onClick={() => handlePropertyClick(property.id)}>
              <CardTitle>{property.title}</CardTitle>
              <CardDescription>{property.description}</CardDescription>
            </CardHeader>

            <CardContent onClick={() => handlePropertyClick(property.id)}>
              <img src={property.image} alt="" />
              <p>{property.address}</p>
              <p className="text-sm text-gray-500">
                Property ID: {property.id}
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <p>{property.price}$ per night</p>

              {/* View Reviews */}
              <Link
                to={`/reviews/${property.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  View Reviews
                </button>
              </Link>

              {/* Write Review */}
              <Link
                to={`/review/${property.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                  Write a Review
                </button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="flex justify-center">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/admin")}
          >
            Admin Portal
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
