// userRegister.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Tregister } from "../schema/LoginSchema";

const Register = async (data: Tregister) => {
  console.log("i am here", data);
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/register",
      data
    );
    console.log("Registration successful:", response.data);

    return response?.data;
  } catch (error) {
    console.error("Registration failed:", error);
    // Handle error, e.g., display error message to user
  }
};
export const userRegister = () => {
  return useMutation({
    mutationFn: (data: Tregister | any) => Register(data),
    onSuccess: (data: any) => {
      toast.success(`successfilly register`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
