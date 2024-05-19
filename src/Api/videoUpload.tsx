// userRegister.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Tvideo } from "../schema/videoschema";

const upload = async (data: Tvideo) => {
  try {
    const response = await axios({
      url: "http://localhost:4000/api/v1/upload",
      data: data,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};
export const uploadVideo = () => {
  return useMutation({
    mutationFn: (data: Tvideo | any) => upload(data),
    onSuccess: (data: any) => {
      toast.success(`successfilly upload`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
