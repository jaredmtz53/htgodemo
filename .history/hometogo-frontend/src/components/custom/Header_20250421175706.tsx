import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function Header() {
  const [signedIn, setSignedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchAppUser = async () => {
      const googleUser = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(
        `http://localhost:8080/api/users/email/${googleUser.email}`
      );
      const appUser = await res.json();
      localStorage.setItem("appUser", JSON.stringify(appUser));
      setUserId(appUser.id);
      setSignedIn(true);
    };

    fetchAppUser();
  }, []);

  return (
    <div className="p-3 flex justify-between items-center px-5">
      Link
      <div className="flex items-center cursor-pointer">
        <img className="h-20" src="/file.svg" />
        <h2 className="font-extrabold text text-4xl text-gray-800 cursor-pointer">
          HomeToGO
        </h2>
      </div>
      <div className="flex items-center gap-5">
        <Link to={`/properties/${userId}`}>
          <Button className="cursor-pointer">My Properties</Button>
        </Link>
        <Button className="cursor-pointer">My Bookings</Button>
        <Button className="cursor-pointer">
          {signedIn ? "Signed In" : "Sign In"}
        </Button>
        <CgProfile className="size-10 cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
