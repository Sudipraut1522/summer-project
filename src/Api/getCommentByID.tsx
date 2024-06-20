import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const getCommentByID = async (id: any) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/getcomment/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return responce?.data?.comments;
  } catch (error) {
    console.log("something went wrong");
  }
};
export const useGetAllCommentByID = (videoID: any) => {
  return useQuery({
    queryKey: ["commentByID", videoID],
    queryFn: () => getCommentByID(videoID),
    enabled: !!videoID,
  });
};
