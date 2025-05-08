import React, { useEffect, useState } from "react";
import axios from "axios";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((response) => {
        console.log(response.data); // Log the response data
        setProperties(response.data);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <div className="p-10 md:px-20 lg:px-40 xl:px-60">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {properties.map((property: any) => (
          <div key={property.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{property.title}</h2>

            <img
              src="https://hips.hearstapps.com/hmg-prod/images/dutch-colonial-house-style-66956274903da.jpg?crop=1.00xw:0.671xh;0,0.131xh&resize=1120:*"
              alt={property.name}
              className="w-full h-40 object-cover mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
