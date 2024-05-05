import React, { useState } from "react";
import Model from "./component/model/Model";
import UserLoginModel from "./component/model/userLogin";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isRegistering, setIsRegistering] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="bg-slate-600">
      {isRegistering ? (
        <Model onClose={closeModal} open={isModalOpen} login={toggleModal} />
      ) : (
        <UserLoginModel onClose={closeModal} openLogin={isModalOpen} />
      )}
    </div>
  );
};

export default HomePage;
