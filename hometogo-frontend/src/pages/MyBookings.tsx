import { useState } from "react";
import axios from "axios";

type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  property: {
    id: number;
  };
};

const MyBookings: React.FC = () => {
  const [tenantIdInput, setTenantIdInput] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tenantId = Number(tenantIdInput);
    if (!tenantId) {
      alert("Please enter a valid tenant ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/tenant/${tenantId}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Bookings</h1>

      <form onSubmit={handleSubmit} className="mb-6 text-center">
        <input
          type="number"
          placeholder="Enter your tenant ID"
          value={tenantIdInput}
          onChange={(e) => setTenantIdInput(e.target.value)}
          className="border px-3 py-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Bookings
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings found for that tenant ID.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Booking ID</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">End Date</th>
              <th className="p-2 text-left">Property ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-2">{b.id}</td>
                <td className="p-2">{b.startDate}</td>
                <td className="p-2">{b.endDate}</td>
                <td className="p-2">{b.property?.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
