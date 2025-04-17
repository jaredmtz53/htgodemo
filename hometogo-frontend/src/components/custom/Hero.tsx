import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
function Hero() {

  const [OpenDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      GetUserProfile(tokenResponse);
      navigate('/Role');
    },
    onError: errorResponse => {
      console.log("Login Failed", errorResponse);
    }
  });
  const handleDialog= async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    else {
      navigate('/Role');
    }

  };
  const GetUserProfile=(tokenInfo: any)=>{
    axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      }
    )
    .then((resp) => {
      console.log("User Profile", resp);
      localStorage.setItem("user", JSON.stringify(resp?.data));
      setOpenDialog(false);

      axios.post("http://localhost:8080/api/users/google", {
        email: resp.data.email,
        name: resp.data.name,
        given_name: resp.data.given_name,
        family_name: resp.data.family_name,
        picture: resp.data.picture,
        sub: resp.data.sub,
      })
      .then(res => console.log("User saved:", res.data))
      .catch(err => console.error("Error saving user:", err));
    });
    
    
  
  }


  return (
    <div className="flex flex-col items-center justify-center bg-cover bg-center gap-1.5">
      <h1 className="font-extrabold text-[40px] text-center text-gray-800 mt-16">
        <div className="text-green-400">
          Book your next big adventure with HomeToGO:
        </div>
        Where hosting meets comfort, and booking feels like home.{" "}
      </h1>

      <Button onClick={handleDialog} className="mt-5 cursor-pointer">Get Started</Button>
      <img className="h-150" src="/public/7061505.jpg" alt="" />
      
      
      <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Sign in With Google</DialogTitle>
            <DialogDescription className="text-center">
            <p className="text-center">Sign in to the App with google authentication securely</p>
              <Button className="mt-5 cursor-pointer" onClick={() => login()}>
              <FcGoogle className="h-7 w-7" />
              <h1>Sign In with Google</h1>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Hero;
