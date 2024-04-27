import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { baseUrl } from "./userRegister";
// import { useMutation } from "react-query";
// import toast from "react-hot-toast";

export const allUser = async () => {
  try {
    const responce = await axios({
      url: "http://localhost:4000/api/v1/upload",
      method: "GET",
    });
    console.log(responce.data?.users);
    return responce?.data;
  } catch (error) {
    console.log("something went wrong");
  }
};
export const getAllUser = () => {
  return useQuery({
    queryKey: ["all_dish"],
    queryFn: () => allUser(),
  });
};
