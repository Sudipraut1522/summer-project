import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const videoDetail = async (id: any) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/getvideo/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return responce?.data?.video;
  } catch (error) {
    console.log("something went wrong");
  }
};
export const getVideoById = (id: any) => {
  return useQuery({
    queryFn: () => videoDetail(id),
    queryKey: ["getvideobyid"],
  });
};
