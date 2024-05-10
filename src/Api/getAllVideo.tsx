import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const video = async () => {
  try {
    const responce = await axios({
      url: "http://localhost:4000/api/v1/videos",
      method: "GET",
    });
    console.log(responce.data?.users);
    return responce?.data?.users;
  } catch (error) {
    console.log("something went wrong");
  }
};
export const getAllVideo = () => {
  return useQuery({
    queryKey: ["usersvideo"],
    queryFn: video,
  });
};
