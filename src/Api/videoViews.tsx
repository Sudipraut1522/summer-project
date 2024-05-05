import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const videoViews = async (id: any) => {
  try {
    const responce = await axios({
      url: "http://localhost:4000/api/v1/views" + { id },

      method: "POST",
    });

    return responce;
  } catch (erre) {
    console.log("some error cooured");
  }
};

export const countViews = () => {
  return useMutation({
    mutationFn: (id: any) => videoViews(id),

    onSuccess: () => {
      console.log("video count success");
    },
    onError: () => {
      console.log("soome error occured");
    },
  });
};
