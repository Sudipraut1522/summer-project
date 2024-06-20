import axios from "axios";
import { useQuery } from "react-query";

export const videoById = async (id: any) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/getvideos/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("getvideocomment", responce);
    // return responce?.data?.video;
  } catch (err) {
    throw err;
  }
};

export const useGetVideoById = (id: any) => {
  return useQuery({
    queryFn: () => videoById(id),
    queryKey: ["getVideoById", id],
  });
};
