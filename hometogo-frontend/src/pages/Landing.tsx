import LandingGrid from "@/components/custom/LandingGrid";
import React, { useEffect } from "react";
import axios from "axios";
function Landing() {
  const [properties, setProperties] = React.useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:8080/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {properties.map((property: any) => (
            <div key={property.id} className="border p-4 rounded shadow">
                <h2>{property.title}</h2>
            </div>
        ))}

      </div>
    </div>
  );
}

export default Landing;
