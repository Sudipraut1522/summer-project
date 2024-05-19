import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const like = async (id: any) => {
  console.log("id", id);
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/like/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(responce?.data);
    return responce?.data;
  } catch (error) {
    throw error;
  }
};

export const userLike = () => {
  return useMutation({
    mutationFn: (id: any) => like(id),
    onSuccess: () => {
      console.log("Video Like success");
    },
    onError: (error) => {
      console.log("An error occurred", error);
    },
  });
};

export default userLike;
