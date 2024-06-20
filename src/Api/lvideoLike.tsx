import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const like = async (id: any) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/like/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return responce?.data;
  } catch (error) {
    throw error;
  }
};

export const userLike = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (id: any) => like(id),
    onSuccess: () => {
      console.log("Video Like success");
      query.invalidateQueries({ queryKey: ["usersvideo"] });
    },
    onError: (error) => {
      console.log("An error occurred", error);
    },
  });
};

export default userLike;
