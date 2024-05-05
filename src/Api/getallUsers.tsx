import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const allUser = async () => {
  try {
    const responce = await axios({
      url: "http://localhost:4000/api/v1/userDetail",
      method: "GET",
    });
    console.log(responce?.data?.users);
    return responce?.data?.users;
  } catch (error) {
    console.log("something went wrong");
  }
};
export const getAllUser = () => {
  return useQuery({
    queryKey: ["all_users"],
    queryFn: allUser,
  });
};
