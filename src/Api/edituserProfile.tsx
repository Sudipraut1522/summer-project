"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Tregister } from "../schema/LoginSchema";

const edit = async (data: Tregister) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/editprofile`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    return responce?.data;
  } catch (error: any) {
    return Promise.reject(error?.responce?.data || "something is wrong");
  }
};

export const useEidiUserProfile = () => {
  return useMutation({
    mutationFn: (data: Tregister) => edit(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("some error occured");
    },
  });
};
