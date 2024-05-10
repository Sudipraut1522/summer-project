"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Tvideo } from "../schema/videoschema";

const edit = async (data: Tvideo) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/editVi/${data}`,
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

export const useEditVideo = () => {
  return useMutation({
    mutationFn: (data: Tvideo) => edit(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("some error occured");
    },
  });
};
