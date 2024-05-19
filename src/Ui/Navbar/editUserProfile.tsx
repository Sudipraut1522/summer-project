import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Edituserprofile from "../../component/model/Edituserprofile";

const EditProfile: React.FC = () => {
  const router = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    router("/home/userProfile");
  };

  return (
    <div>
      <Edituserprofile onClose={closeModal} open={isModalOpen} />
    </div>
  );
};

export default EditProfile;
