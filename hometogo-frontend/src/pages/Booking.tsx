import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Booking components
type Booking = {
  startDate: string;
  endDate: string;
  propertyId: number;
  tenantId: number;
};

// Booking function
const Booking: React.FC = () => {
  const { propertyId } = useParams();

  // Initialize booking form
  const [booking, setBooking] = useState<Booking>({
    startDate: "",
    endDate: "",
    propertyId: propertyId ? Number(propertyId) : 0,
    tenantId: 0,
  });

  // Hold submitted booking
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  // Auto-fill tenantId from localStorage (Tenant ID 2) 
  useEffect(() => {
    const storedTenantId = Number(localStorage.getItem("tenantId"));
    if (storedTenantId) {
      setBooking((prev) => ({ ...prev, tenantId: storedTenantId }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: name.includes("Id") ? Number(value) : value });
  };

  // Handles and saves booking submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚨 Form submitted!");
    console.log("📦 Payload:", booking); 
  
    try {
      const res = await axios.post("http://localhost:8080/api/bookings", booking, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("✅ Success:", res.data);
      setSubmittedBooking(res.data);
    } catch (err) {
      console.error("❌ Booking failed:", err);
    }
  };
  
  
  
  // Html booking form 
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Book this house!</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block mb-1 font-medium">
            Start Date
          </label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={booking.startDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block mb-1 font-medium">
            End Date
          </label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={booking.endDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tenant ID */}
        <div>
          <label htmlFor="tenantId" className="block mb-1 font-medium">
            Tenant ID
          </label>
          <Input
            type="number"
            id="tenantId"
            name="tenantId"
            value={booking.tenantId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Property ID (editable by user) */}
        <div>
          <label htmlFor="propertyId" className="block mb-1 font-medium">
            Property ID
          </label>
          <Input
            type="number"
            id="propertyId"
            name="propertyId"
            value={booking.propertyId}
            onChange={(e) =>
              setBooking({ ...booking, propertyId: Number(e.target.value) })
            }
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Booking
        </Button>
      </form>

      {/* Show submitted booking */}           
      {submittedBooking && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="font-semibold text-lg mb-2 text-center">
            Booking Created
          </h2>
          <p>
            <strong>Start Date:</strong> {submittedBooking.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {submittedBooking.endDate}
          </p>
          <p>
            <strong>Tenant ID:</strong> {submittedBooking.tenantId}
          </p>
          <p>
            <strong>Property ID:</strong> {submittedBooking.propertyId}
          </p>
        </div>
      )}
    </div>
  );
};

export default Booking;