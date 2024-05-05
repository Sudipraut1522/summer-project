import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteUser = async (id: any) => {
  console.log("id", id);
  try {
    const response = await axios({
      url: `http://localhost:4000/api/v1/delete/${id}`,
      method: "DELETE",
    });
    console.log("response", response);
  } catch (error) {
    console.log("error", error);
  }
};
export const userDelete = () => {
  return useMutation({
    mutationFn: (id: any) => deleteUser(id),
    onSuccess: () => {
      console.log("userdelete success");
    },
    onError: (error) => console.log("some error occured", error),
  });
};
