import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const watchedvideo = async (id: any) => {
  console.log("video id", id);
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1//watchedvideo/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const watchHistory = () => {
  return useMutation({
    mutationFn: (id: any) => watchedvideo(id),
    onSuccess: () => {
      console.log(" success");
    },
    onError: (error) => {
      console.log("An error occurred", error);
    },
  });
};
