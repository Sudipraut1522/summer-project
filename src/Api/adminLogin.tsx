// userRegister.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Tlogin } from "../schema/LoginSchema";

const login = async (data: Tlogin) => {
  console.log("i am here", data);
  try {
    const response = await axios({
      url: "http://localhost:4000/api/v1/adminlogin",
      data: data,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("Registration successful:", response.data.isAdmin);
    if (response?.data?.token) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("role", response?.data?.isAdmin);
    }
    return response?.data;
  } catch (error: any) {
    console.error("Login failed:", error);
    // Check if the error response is in JSON format
    if (error.response && error.response.data) {
      // Display error message from JSON response
      toast.error(
        `An error occurred while logging in: ${error.response.data.message}`
      );
    } else {
      // Display generic error message
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
    // Rethrow the error to be caught by the mutation
    throw error;
  }
};

export const adminLogin = () => {
  return useMutation({
    mutationFn: (data: Tlogin | any) => login(data),
    onSuccess: () => {
      toast.success("Welcome to dashboard");
    },
    onError: (error: any) => {
      // Display generic error message
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    },
  });
};
