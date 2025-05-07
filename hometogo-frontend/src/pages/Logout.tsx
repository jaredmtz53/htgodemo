import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2">
      Logout
    </button>
  );
};

export default Logout;
