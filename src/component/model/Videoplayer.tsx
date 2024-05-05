import React, { useState } from "react";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <>
      <video controls width={700} height={700}>
        <source src={url} />
      </video>
    </>
  );
};
export default VideoPlayer;
