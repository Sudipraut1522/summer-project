import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Tregister } from "../schema/LoginSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = async (data: Tregister) => {
  console.log("i am here", data);
  try {
    const response = await axios({
      url: "http://localhost:4000/api/v1/register",
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response?.data;
  } catch (error: any) {
    console.error("Registration failed:", error);
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
};

export const userRegister = () => {
  return useMutation({
    mutationFn: (data: Tregister | any) => Register(data),
    onSuccess: (data: any) => {
      toast.success(`Successfully registered:${data}`);
    },
    onError: (error: any) => {
      toast.error(`An error occurred while registering: ${error.message}`);
    },
  });
};
