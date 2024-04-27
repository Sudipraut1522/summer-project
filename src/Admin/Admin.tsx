import { useState } from "react";
import AdminLoginModel from "../component/model/AdminLogin";

const Admin = () => {
  const [openLogin, setOpenLogin] = useState(true);

  const openModal = () => {
    setOpenLogin(false);
  };

  return (
    <div>
      <AdminLoginModel openLogin={openLogin} onClose={openModal} />
    </div>
  );
};

export default Admin;
