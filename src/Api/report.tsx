import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const report = async () => {
  try {
    const responce = await axios({
      url: "http://localhost:4000/api/v1/report",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("responce", responce?.data);
    return responce?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const getReport = () => {
  return useQuery({
    queryKey: ["getReport"],
    queryFn: () => report(),
  });
};
