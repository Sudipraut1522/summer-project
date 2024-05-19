import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const history = async () => {
  try {
    const response = await axios({
      url: "http://localhost:4000/api/v1//watchHistory",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("response", response?.data?.watchHistory);
    return response?.data?.watchHistory;
  } catch (error) {
    // Renamed variable to 'error'
    console.log("An error occurred", error); // Logging the error message
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const userWatchHistory = () => {
  return useQuery({
    queryFn: () => history(),
    queryKey: ["userHistory"],
  });
};
