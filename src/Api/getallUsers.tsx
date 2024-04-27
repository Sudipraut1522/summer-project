import axios from "axios";
import { baseUrl } from "./userRegister";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

const allUser = async (data: any) => {
  try {
    const responce = await axios({
      url: baseUrl + "",
      method: "GET",
      data: data,
    });
    console.log(responce.data);
  } catch (error) {
    console.log("something went wrong");
  }
};

const getAllUser = async () => {
  return useMutation({
    mutationFn: (data: any) => allUser(data),
    onSuccess: (data: any) => {
      toast.success(`${data.message}`);
    },
    onError: (error: any) => {
      toast.error(`Some error occured`, error);
    },
  });
};
