import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const user = async () => {
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/userProfile`, // Corrected URL format
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("response", response?.data?.user);
    return response?.data?.user;
  } catch (error) {
    // Renamed variable to 'error'
    console.log("An error occurred", error); // Logging the error message
    throw error; // Rethrow the error to handle it in the caller
  }
};

const getAllUserProfile = () => {
  return useQuery({
    queryFn: () => user(),
    queryKey: ["userProfile"],
  });
};
export default getAllUserProfile;
