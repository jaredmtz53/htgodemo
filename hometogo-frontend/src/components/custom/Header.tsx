import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate(); 
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setSignedIn(!!storedUser);
  }, []);

  return (
    <div className="p-3 flex justify-between items-center px-5">
      <div className="flex items-center cursor-pointer">
        <img className="h-20" src="/file.svg" />
        <h2 className="font-extrabold text text-4xl text-gray-800 cursor-pointer">
          HomeToGO
        </h2>
      </div>
      <div className="flex items-center gap-5">
        <Link to="/properties">
          <Button className="cursor-pointer">My Properties</Button>
        </Link>

        <Button className="cursor-pointer" onClick={() => navigate("/mybookings")}>
          My Bookings
          </Button>
        




        <Button className="cursor-pointer" onClick={() => navigate("/LogOn")}>
          {signedIn ? "Signed In" : "Sign In"}
        </Button>
        <CgProfile className="size-10 cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
