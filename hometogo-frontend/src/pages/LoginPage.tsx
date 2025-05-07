import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/landing");
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await handleGoogleLogin(tokenResponse.access_token);
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const { data: googleUser } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const response = await axios.post("http://localhost:8080/api/login", {
        email: googleUser.email,
      });

      const { token, user } = response.data;

      // Store JWT and user data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to landing page
      navigate("/landing");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl mb-4">Login with Google</h1>
      <Button onClick={() => login()} className="bg-blue-500 text-white">
        <FcGoogle size={24} />
        Sign in with Google
      </Button>
    </div>
  );
};

export default LoginPage;
