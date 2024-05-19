import { useEffect, useState } from "react";
import UserLoginModel from "../component/model/userLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const router = useNavigate();
  const [openmodal, setOpenModal] = useState(true);

  useEffect(() => {
    if (!openmodal) {
      router("/userlogin");
    }
  }, [openmodal, router]);

  const closeModal = () => {
    setOpenModal(false);
    router("/");
  };

  return (
    <>
      <UserLoginModel openLogin={openmodal} onClose={closeModal} />
    </>
  );
};
