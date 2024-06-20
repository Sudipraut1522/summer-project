import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const approvedUser = async (id: any) => {
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/isapproved/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};
export const getApproved = () => {
  return useMutation({
    mutationFn: (id: any) => approvedUser(id),
    onSuccess: () => {
      toast.success("User Approved  successfully");
    },
    onError: (error: any) => toast.error("User reject successfully"),
  });
};
