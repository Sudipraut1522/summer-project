import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoEditPage from "../../component/model/VideoeditModal";

const VideoUpadatePage = () => {
  const router = useNavigate();
  const [openModal, setOpenLogin] = useState(true);

  const closeModal = () => {
    setOpenLogin(false);
    router("/dashboard/videopage");
  };

  return (
    <div>
      <VideoEditPage open={openModal} onClose={closeModal} />
    </div>
  );
};

export default VideoUpadatePage;
