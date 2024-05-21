import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const videoViews = async (id: any) => {
  console.log("video id", id);
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/views/${id}`, // Corrected URL format
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    // Renamed variable to 'error'
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const countViews = () => {
  return useMutation({
    mutationFn: (id: any) => videoViews(id),
    onSuccess: () => {
      console.log("Video count success");
    },
    onError: (error) => {
      // Renamed variable to 'error'
      console.log("An error occurred", error); // Logging the error message
    },
  });
};
