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
    <div className="bg-slate-600 bg-[url('https://thumbs.dreamstime.com/b/asian-student-boy-video-conference-e-learning-teacher-computer-living-room-home-online-education-internet-social-187311773.jpg')]">
      <Model onClose={closeModal} open={isModalOpen} login={toggleModal} />
    </div>
  );
};

export default HomePage;
