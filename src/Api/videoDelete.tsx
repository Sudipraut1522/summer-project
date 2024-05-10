import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const videoDelete = async (id: any) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/deletevideo/${id}`,
      method: "DELETE",
    });

    return responce?.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteVideo = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: any) => videoDelete(id),

    onSuccess: () => {
      console.log("deleted video successful");
      query.invalidateQueries({ queryKey: ["usersvideo"] });
    },
    onError: () => {
      console.log("some error occured");
    },
  });
};
