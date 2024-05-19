import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoUploadMod from "../../component/model/videoUpload";

const VideoUpload = () => {
  const router = useNavigate();
  const [openLogin, setOpenLogin] = useState(true);

  const openModal = () => {
    setOpenLogin(false);
    router("/dashboard/videopage");
  };

  return (
    <div>
      <VideoUploadMod open={openLogin} onClose={openModal} />
    </div>
  );
};

export default VideoUpload;
