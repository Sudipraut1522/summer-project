import axios from "axios";
import { useMutation } from "react-query";
import { Tlogin } from "../schema/LoginSchema";
import toast from "react-hot-toast";

import { baseUrl } from "./userRegister";

const login = async (data: Tlogin) => {
  try {
    const response = await axios({
      url: `${baseUrl}/login`,
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const userLogin = (select?: any) => {
  return useMutation({
    mutationFn: (data: Tlogin) => login(data),
    onSuccess: (data: any) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });
};
