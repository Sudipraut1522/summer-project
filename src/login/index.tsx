import { useState } from "react";
import UserLoginModel from "../component/model/userLogin";

export const Login = () => {
  const [openmodal, setOpemMOdal] = useState(true);

  const closeModal = () => {
    setOpemMOdal(false);
  };
  return (
    <>
      <UserLoginModel openLogin={openmodal} onClose={closeModal} />
    </>
  );
};
