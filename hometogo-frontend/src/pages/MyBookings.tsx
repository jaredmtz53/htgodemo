import { useEffect, useState } from "react";
import axios from "axios";

type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  property: {
    id: number;
    name: string;
    location: string;
  };
};

const MyBookings: React.FC = () => {
  const tenantId = Number(localStorage.getItem("tenantId")); // ✅ dynamic
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true); // optional

  useEffect(() => {
    if (!tenantId) {
      console.warn("⚠️ No tenantId found in localStorage");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/bookings/tenant/${tenantId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, [tenantId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Bookings</h1>

      {loading ? (
        <p className="text-center">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">You haven't made any bookings yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Booking ID</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">End Date</th>
              <th className="p-2 text-left">Property</th>
            </tr>
          </thead>
          <tbody>
  {bookings.map((b) => (
    <tr key={b.id} className="border-t">
      <td className="p-2">{b.id}</td>
      <td className="p-2">{b.startDate}</td>
      <td className="p-2">{b.endDate}</td>
      <td className="p-2">
        {/* ✅ Always show property ID; optionally name & location */}
        #{b.property?.id}
        {b.property?.name && ` — ${b.property.name}`}
        {b.property?.location && ` — ${b.property.location}`}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default MyBookings;
