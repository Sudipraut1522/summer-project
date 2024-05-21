import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Tlogin } from "../schema/LoginSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = async (data: Tlogin) => {
  try {
    const response = await axios({
      url: "http://localhost:4000/api/v1/login",
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
  } catch (error) {
    throw new Error("Login failed"); // Throw error to be caught by onError
  }
};

export const userLogin = () => {
  return useMutation({
    mutationFn: (data: Tlogin | any) => login(data),
    onError: (error: any) => {
      toast.error(`Error occurred: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Welcome to the Home page");
    },
  });
};
