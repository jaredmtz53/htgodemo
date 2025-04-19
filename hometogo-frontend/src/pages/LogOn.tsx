import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";





const LoginPage = () => {





  //Google authoraztion
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await getUserProfile(tokenResponse.access_token);
    },
    onError: () => {
      console.error("Google login failed");
    },
  });


  // Function to handle google profile using googleDTO from the java crud 
  const getUserProfile = async (accessToken: string) => {
    try {
      const { data: googleUser } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

 

      //Saving data from google localy
      localStorage.setItem("googleUser", JSON.stringify(googleUser));

     









      //Communicating to the backend the information needed for the user
      const response = await axios.post("http://localhost:8080/api/users/google", {
        email: googleUser.email,
        name: googleUser.name,
        given_name: googleUser.given_name,
        family_name: googleUser.family_name,
        picture: googleUser.picture,
        sub: googleUser.sub,
      });



    
      const appUser = response.data;

      


      // Data stored locally
      localStorage.setItem("user", JSON.stringify(appUser));



      //When login successful redirect to our landing page
      navigate("/Landing");
    } catch (error) {

      // error for just in case 
      console.error("Error during login:", error);
    }
  };






 //Redender page itself GUI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Welcome to HomeToOnTheGo
      </h1>
      <p className="text-muted-foreground mb-4">
        Sign in to your account
      </p>

      <Button className="gap-2" onClick={() => setShowDialog(true)}>
        <FcGoogle className="size-6" />
        Sign in with Google
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Sign in With Google</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mb-4">Secure sign-in using your Google account</p>
              <Button
                onClick={() => login()}
                className="w-full justify-center gap-2"
              >
                <FcGoogle className="size-6" />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
