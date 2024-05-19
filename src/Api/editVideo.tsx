"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const edit = async (data: any) => {
  const { id, ...rest } = data;
  console.log({ rest });
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/editvideo/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: rest,
    });

    console.log("this is res", response?.data);
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useEditVideo = () => {
  return useMutation({
    mutationFn: (data) => edit(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("Some error occurred");
    },
  });
};
