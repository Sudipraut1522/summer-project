// userRegister.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Tregister } from "../schema/LoginSchema";

export const baseUrl = import.meta.env.VITE_BASE_URL;
console.log("asdas", baseUrl);
const Register = async (data: Tregister) => {
  console.log("i am here", data);
  try {
    const responce = await axios({
      url: "http//:localhost:4000/api/v1/" + "/register",
      data: data,
      method: "POST",
    });
    return responce?.data;
  } catch (error: any) {
    console.log("error", error);
  }
};
export const userRegister = () => {
  return useMutation({
    mutationFn: (data: Tregister | any) => Register(data),
    onSuccess: (data: any) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
