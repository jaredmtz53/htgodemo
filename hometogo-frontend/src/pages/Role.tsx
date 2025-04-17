import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Role() {
  const navigate = useNavigate();

  const handleRoleSelection = async (role: string) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if(!user || !user.email) {
      alert("Please log in to continue.");
      return;
    }
    const response = await axios.get(`http://localhost:8080/api/users/email/${user.email}`);
    const userId = response.data.id;
    try {
      if (role === "host") {
        // Add logic for handling the "host" role
        console.log("Host role selected");
        await axios.post(`http://localhost:8080/api/users/${userId}/host`, {
          hostBio: ""
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        navigate("/landing");
      }
    } catch (error) {
      console.error("An error occurred while selecting the role:", error);
      alert("Something went wrong. Please try again.");
    }
  }
return (
    <div className="flex justify-center items-center ">
      <div className="grid grid-cols-3 gap-8 p-10">
        <div onClick={() => handleRoleSelection("host")} className="bg-white p-6 rounded shadow text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Host</h2>
          <img src="/public/5343856.jpg" alt="" className="h-48 object-cover mb-4" />
          <p className="text-gray-600">List your property and manage bookings.</p>
        </div>
        <div onClick={() => handleRoleSelection("tenant")} className="bg-white p-6 rounded shadow text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Tenant</h2>
          <img src="/public/4285073.jpg" alt="" className="h-48 object-cover mb-4" />
          <p className="text-gray-600">Find and book your next stay.</p>
        </div>
        <div onClick={() => handleRoleSelection("both")} className="bg-white p-6 rounded shadow text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Both</h2>
          <img src="/public/7354075.jpg" alt="" className="h-48 object-cover mb-4" />
          <p className="text-gray-600">Enjoy the benefits of hosting and traveling.</p>
        </div>
      </div>
    </div>
  );
}

export default Role;
