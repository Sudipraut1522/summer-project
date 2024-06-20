import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getComment = async () => {
  try {
    const responce = await axios({
      url: "http://localhost:4000/api/v1/viewcomment",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return responce.data.comments;
  } catch (error) {
    throw error;
  }
};
export const getAllComment = () => {
  return useQuery({
    queryKey: ["userCommenttt"],
    queryFn: getComment,
  });
};
