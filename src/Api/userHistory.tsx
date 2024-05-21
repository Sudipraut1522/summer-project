import { useQuery } from "@tanstack/react-query";
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
    return response?.data?.watchHistory;
  } catch (error) {
    throw error;
  }
};

export const userWatchHistory = () => {
  return useQuery({
    queryFn: () => history(),
    queryKey: ["userHistory"],
  });
};
