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
  } catch (error) {
    console.error("Login failed:");
    // Handle error, e.g., display error message to user
  }
};
export const adminLogin = () => {
  return useMutation({
    mutationFn: (data: Tlogin | any) => login(data),
    onSuccess: () => {
      toast.success("welcome to dashboard");
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
