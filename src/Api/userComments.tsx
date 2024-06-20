import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const postComment = async (data: any) => {
  const { ID, ...rest } = data;
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/comment/${ID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      data: rest,
    });
    console.log("responce", response);
  } catch (error) {
    throw new Error("Failed to post comment.");
  }
};

export const usePostComment = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => postComment(data),

    onSuccess: (data: any) => {
      toast.success("Comment posted successfully:");
      // query.invalidateQueries({ queryKey: ["getVideoById", ID] });
    },
    onError: (error) => {
      toast.error("Error posting comment:");
    },
  });
};
