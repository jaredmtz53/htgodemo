/**
 * useful imports that Jared explained how to use
 * combined with imports that we suggested by online tutorials
 *
 * useState useEffect --> tsx is stupid cannot remmeber things unless you
 * tell it to.
 * axios --> talking to data, in this case mySQL database
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

/**
 * Obejcts!
 * Similar to structs in C++
 * I defined this with the attributes of user deatils I am
 * attempting to pull from the database.
 * Admin realisticall should be able to view all users, properties,
 * and bookings made on those properties.
 *
 * IMPORTANT NOTE:
 * I have only been able to delete and edit a user!
 * Will reuse the delete to ban users until banning is implemented.
 */
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  banned: boolean; 
};

type Host = {
  id: number;
  hostBio: string;
  user: User;
  hostID?: number; // Optional if both fields are needed
};

type Tenant = {
  id: number;
  tenantBio: string; // optional: if you want to show the bio
  user: User;
};

//type Property = { id: number; name: string; location: string };

type Property = {
  id: number;
  title: string; // from the DB schema, "title" is the column name for property name
  host?: {
    user?: {
      firstName: string;
      lastName: string;
    };
  };
};


type Booking = { id: number; date: string; status: string };

//ADMIN PORTAL
const AdminPortal: React.FC = () => {
  //Literal tabs
  const [tab, setTab] = useState<
    "users" | "hosts" | "tenants" | "properties" | "bookings" | "banned"
  >("users");

  // data states for the enties that Admin is to modrate
  const [users, setUsers] = useState<User[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );

  // Data states intened to keeping stats and other anlytics, meant for show, required by teacher guidlines
  const [stats, setStats] = useState({
    users: 0,
    hosts: 0,
    tenants: 0,
    properties: 0,
    bookings: 0,
  });

  // Meant to fetch stats and gather them
  const fetchStats = async () => {
    const [u, h, t, p] = await Promise.all([
      axios.get("http://localhost:8080/api/users"),
      axios.get("http://localhost:8080/api/host"),
      axios.get("http://localhost:8080/api/tenant"),
      axios.get("http://localhost:8080/api/properties"),
    ]);
    setStats({
      users: u.data.length,
      hosts: h.data.length,
      tenants: t.data.length,
      properties: p.data.length,
      bookings: 0, // update if you add a count endpoint
    });
  };



  //TRYING TO BAN USERS

  const [bannedUsers, setBannedUsers] = useState<User[]>([]);

  const fetchBannedUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
    setBannedUsers(res.data.filter((user: User) => user.banned)); // fixed .bannned
  };









  // Talking to the database via our predeined endpoints from Java Crud API
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
     const res = await axios.get(
       `http://localhost:8080/api/bookings/${propertyId}`
     );
     setBookings(res.data);
   };

  //const fetchBookings = async (propertyId: number) => {
  //  const res = await axios.get(
  //  `http://localhost:8080/api/bookings/${propertyId}`
  //  );
  //  setBookings(res.data);
  //};
  ///useEffect(() => {
  //  console.log("PROPERTIES DATA:", properties);
  //}, [properties]);

  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    fetchUsers();
    fetchStats();
  };

  // Constant call to fethStats
  useEffect(() => {
    fetchStats();
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
      case "banned":
        fetchBannedUsers();
        break;
    }
  }, [tab]); // <-- leave only this
  
  

  // Render the UI for the admin page
  /**
   * Set of tables that will be populated with the
   * data from the database.
   */
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="bg-gray-100 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold">{val}</h3>
            <p className="text-muted-foreground capitalize">{key}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
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
      {/* Users */}
      {/*
      {tab === "users" && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const updatedUser = { ...user };
              return (
                <tr key={user.id} className="border-t">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2 space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <form
                          className="space-y-3"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await axios.put(
                              `http://localhost:8080/api/users/${user.id}`,
                              updatedUser
                            );
                            fetchUsers();
                            fetchStats();
                          }}
                        >
                          <Input
                            defaultValue={user.firstName}
                            onChange={(e) =>
                              (updatedUser.firstName = e.target.value)
                            }
                          />
                          <Input
                            defaultValue={user.lastName}
                            onChange={(e) =>
                              (updatedUser.lastName = e.target.value)
                            }
                          />
                          <Input
                            defaultValue={user.email}
                            onChange={(e) =>
                              (updatedUser.email = e.target.value)
                            }
                          />
                          <Input
                            defaultValue={user.username}
                            onChange={(e) =>
                              (updatedUser.username = e.target.value)
                            }
                          />
                          <Button type="submit">Save</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}


      {/* Users */}
{tab === "users" && (
  <table className="w-full border text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 text-left">ID</th>
        <th className="p-2 text-left">Name</th>
        <th className="p-2 text-left">Email</th>
        <th className="p-2 text-left">Username</th>
        <th className="p-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => {
        const updatedUser = { ...user };
        return (
          <tr key={user.id} className="border-t">
            <td className="p-2">{user.id}</td>
            <td className="p-2">
              {user.firstName} {user.lastName}
            </td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.username}</td>
            <td className="p-2 space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                  </DialogHeader>
                  <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await axios.put(
                        `http://localhost:8080/api/users/${user.id}`,
                        updatedUser
                      );
                      fetchUsers();
                      fetchStats();
                    }}
                  >
                    <Input
                      defaultValue={user.firstName}
                      onChange={(e) =>
                        (updatedUser.firstName = e.target.value)
                      }
                    />
                    <Input
                      defaultValue={user.lastName}
                      onChange={(e) =>
                        (updatedUser.lastName = e.target.value)
                      }
                    />
                    <Input
                      defaultValue={user.email}
                      onChange={(e) =>
                        (updatedUser.email = e.target.value)
                      }
                    />
                    <Input
                      defaultValue={user.username}
                      onChange={(e) =>
                        (updatedUser.username = e.target.value)
                      }
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </Button>
              {user.banned ? (
  <Button
    variant="outline"
    size="sm"
    onClick={async () => {
      await axios.put(`http://localhost:8080/api/users/${user.id}/unban`);
      fetchUsers();
    }}
  >
    Unban
  </Button>
) : (
  <Button
    variant="outline"
    size="sm"
    onClick={async () => {
      await axios.put(`http://localhost:8080/api/users/${user.id}/ban`);
      fetchUsers();
    }}
  >
    Ban
  </Button>
)}

            
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}


      {/* Hosts */}
      {tab === "hosts" && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Host ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Bio</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((h) => (
              <tr key={h.id} className="border-t">
                <td className="p-2">{h.id}</td>
                <td className="p-2">
                  {h.user?.firstName} {h.user?.lastName}
                </td>
                <td className="p-2">{h.user?.email}</td>
                <td className="p-2">{h.hostBio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Tenants */}
      {tab === "tenants" && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Tenant ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Bio</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.id}</td>
                <td className="p-2">
                  {t.user?.firstName} {t.user?.lastName}
                </td>
                <td className="p-2">{t.user?.email}</td>
                <td className="p-2">{t.tenantBio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


{tab === "properties" && (
  <table className="w-full border text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 text-left">Property ID</th>
        <th className="p-2 text-left">Title</th> {/* Changed: using title instead of name */}
        <th className="p-2 text-left">Host</th>
        <th className="p-2 text-left">Bookings</th>
      </tr>
    </thead>
    <tbody>
      {properties.map((p) => (
        <tr key={p.id} className="border-t">
          <td className="p-2">{p.id}</td>
          <td className="p-2">{p.title}</td> {/* Changed: p.name -> p.title */}
          <td className="p-2">
            {/* Uses optional chaining to safely access host and user fields */}
            {p.host?.user?.firstName} {p.host?.user?.lastName}
          </td>
          <td className="p-2">
            <Button
              onClick={() => {
                setSelectedPropertyId(p.id);
                setTab("bookings");
                fetchBookings(p.id);
              }}
            >
              View
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}


{tab === "banned" && (
  <table className="w-full border text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 text-left">ID</th>
        <th className="p-2 text-left">Name</th>
        <th className="p-2 text-left">Email</th>
        <th className="p-2 text-left">Username</th>
        <th className="p-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {bannedUsers.map((user) => (
        <tr key={user.id} className="border-t">
          <td className="p-2">{user.id}</td>
          <td className="p-2">
            {user.firstName} {user.lastName}
          </td>
          <td className="p-2">{user.email}</td>
          <td className="p-2">{user.username}</td>
          <td className="p-2">
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                await axios.put(
                  `http://localhost:8080/api/users/${user.id}/unban`
                );
                fetchBannedUsers();
              }}
            >
              Unban
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      {/* Bookings */}
      {tab === "bookings" && selectedPropertyId && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Bookings for Property #{selectedPropertyId}
          </h2>
          <table className="w-full border text-sm">
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
  )}






export default AdminPortal;
