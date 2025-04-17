import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

type Host = {
  hostID: number;
  user: User;
};

type Tenant = {
  tenantID: number;
  user: User;
};

type Property = {
  id: number;
  name: string;
  location: string;
};

type Booking = {
  id: number;
  date: string;
  status: string;
};

const AdminPortal: React.FC = () => {
  const [tab, setTab] = useState<"users" | "hosts" | "tenants" | "properties" | "bookings">("users");

  const [users, setUsers] = useState<User[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  // Fetchers
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
    setUsers(res.data);
  };

  const fetchHosts = async () => {
    const res = await axios.get("http://localhost:8080/api/host");
    setHosts(res.data);
  };

  const fetchTenants = async () => {
    const res = await axios.get("http://localhost:8080/api/tenant");
    setTenants(res.data);
  };

  const fetchProperties = async () => {
    const res = await axios.get("http://localhost:8080/api/properties");
    setProperties(res.data);
  };

  const fetchBookings = async (propertyId: number) => {
    const res = await axios.get(`http://localhost:8080/api/bookings/${propertyId}`);
    setBookings(res.data);
  };

  // Delete user
  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    switch (tab) {
      case "users":
        fetchUsers();
        break;
      case "hosts":
        fetchHosts();
        break;
      case "tenants":
        fetchTenants();
        break;
      case "properties":
        fetchProperties();
        break;
    }
  }, [tab]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="flex justify-center mb-4 gap-2 flex-wrap">
        {["users", "hosts", "tenants", "properties", "bookings"].map((item) => (
          <Button
            key={item}
            onClick={() => setTab(item as typeof tab)}
            variant={tab === item ? "default" : "outline"}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </div>

      {/* USERS */}
      {tab === "users" && (
        <>
          <div className="flex justify-end mb-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>
                  <DialogDescription>Form pending implementation</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.firstName} {u.lastName}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">
                    <Button variant="destructive" size="sm" onClick={() => deleteUser(u.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* HOSTS */}
      {tab === "hosts" && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Host ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((h) => (
              <tr key={h.hostID} className="border-t">
                <td className="p-2">{h.hostID}</td>
                <td className="p-2">{h.user?.firstName} {h.user?.lastName}</td>
                <td className="p-2">{h.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* TENANTS */}
      {tab === "tenants" && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Tenant ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.tenantID} className="border-t">
                <td className="p-2">{t.tenantID}</td>
                <td className="p-2">{t.user?.firstName} {t.user?.lastName}</td>
                <td className="p-2">{t.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PROPERTIES */}
      {tab === "properties" && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Property ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">View Bookings</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.location}</td>
                <td className="p-2">
                  <Button onClick={() => {
                    setSelectedPropertyId(p.id);
                    setTab("bookings");
                    fetchBookings(p.id);
                  }}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* BOOKINGS */}
      {tab === "bookings" && selectedPropertyId && (
        <>
          <h2 className="text-xl font-semibold mb-4">Bookings for Property #{selectedPropertyId}</h2>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Booking ID</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.id}</td>
                  <td className="p-2">{b.date}</td>
                  <td className="p-2">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminPortal;
