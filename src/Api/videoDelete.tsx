import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const videoDelete = async (id: any) => {
  try {
    const responce = await axios({
      url: `http://localhost:4000/api/v1/deletevideo/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return responce?.data;
  } catch (error: any) {
    console.log("error", error);
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const deleteVideo = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: any) => videoDelete(id),

    onSuccess: () => {
      toast.success(`Delete video successfull`);
      query.invalidateQueries({ queryKey: ["usersvideo"] });
    },
    onError: () => {
      toast.error(`sorry to delte video`);
    },
  });
};
