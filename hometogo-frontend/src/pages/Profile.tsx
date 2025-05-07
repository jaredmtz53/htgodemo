import axios from "axios";
import React, { useEffect } from "react";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = React.useState<any>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedFirstName, setEditedFirstName] = React.useState('');
  const [editedLastName, setEditedLastName] = React.useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setEditedFirstName(response.data.firstName);
        setEditedLastName(response.data.lastName);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/api/users/${id}`, {
        ...user,
        firstName: editedFirstName,
        lastName: editedLastName,
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  if (!user) return <div>No user...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">First Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Last Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <p className="mb-4"><span className="font-semibold">First Name:</span> {user.firstName}</p>
            <p className="mb-4"><span className="font-semibold">Last Name:</span> {user.lastName}</p>
          </>
        )}
        <p className="mb-6"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="mb-6"><span className="font-semibold">ID:</span> {user.id}</p>
        {isEditing ? (
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
