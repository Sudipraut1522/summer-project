import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Tlogin } from "../schema/LoginSchema";
import { toast } from "react-toastify";

const login = async (data: Tlogin) => {
  try {
    const response = await axios({
      url: "http://localhost:4000/api/v1/adminlogin",
      data: data,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("Login successful:", response.data.isAdmin);
    if (response?.data?.token) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("role", response?.data?.isAdmin);
    }
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.responce?.data || "something is wrong");
  }
};

export const adminLogin = () => {
  return useMutation({
    mutationFn: (data: Tlogin | any) => login(data),

    onSuccess: () => {
      toast.success("Welcome to the dashboard");
    },
    onError: (error: any) => {
      toast.error(`Login Failed:${error}`);
    },
  });
};
