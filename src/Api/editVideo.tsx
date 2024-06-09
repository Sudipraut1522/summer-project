import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const edit = async (data: any) => {
  const { id, ...rest } = data;

  const formData = new FormData();
  formData.append("teachername", data.teachername);
  formData.append("title", data.title);
  formData.append("description", data.description);

  formData.append("videourl", data?.videourl[0]);

  formData.append("category", data.category);
  formData.append("subCategory", data.subCategory);

  console.log({ formdata: formData });

  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/editvideo/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    console.log("this is res", response?.data);
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useEditVideo = () => {
  return useMutation({
    mutationFn: (data) => edit(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error}`);
    },
  });
};
