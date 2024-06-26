import { useState } from "react";
import AdminLoginModel from "../component/model/AdminLogin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const router = useNavigate();
  const [openLogin, setOpenLogin] = useState(true);

  const openModal = () => {
    setOpenLogin(false);
    router("/");
  };

  return (
    <div>
      <AdminLoginModel openLogin={openLogin} onClose={openModal} />
    </div>
  );
};

export default Admin;
