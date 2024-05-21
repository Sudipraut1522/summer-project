import React, { useState } from "react";
import Model from "./component/model/Model";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const router = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    router("/userlogin");
  };

  const toggleModal = () => {
    router("/userlogin");
  };

  return (
    <div className="">
      <Model onClose={closeModal} open={isModalOpen} login={toggleModal} />
    </div>
  );
};

export default HomePage;
