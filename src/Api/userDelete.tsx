import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const deleteUser = async (id: any) => {
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};
export const userDelete = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (id: any) => deleteUser(id),
    onSuccess: () => {
      toast.success("User delete successfully");
      query.invalidateQueries({ queryKey: ["allusers"] });
    },
    onError: (error: any) => toast.error("User delete successfully"),
  });
};
