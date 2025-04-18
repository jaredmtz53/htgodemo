import React, { useState } from "react";
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

// Main "compenent" for the login feature
const LoginPage = () =>{


    /**
     * State and Navigation control and hook
     */
    const[showDialog, setDialog] = useState(false);
    const navigate = useNavigate



    //Function handls loging in... Credential checking/Error Handling
    const Login = useGoogleLogin({
        onSuccess: async (tokenResponse) =>{
            await getUserProfile(tokenResponse.access_token);
        },
        onError : () => {
            console.error("Opps!Couldn't Sign in with Google!")
        }
    })



    //Fucntion handels getting our user profilr from the database
    const getUserProfile = async (accessToken: string) => {


        try{

            const { data: googleUser } = await axios.get()



        }catch
        
    };




return();



};

