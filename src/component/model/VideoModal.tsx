import React, { useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
}

const YouTubePlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls={false}
        playing={isPlaying}
        onClick={handlePlayPause}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {isPlaying ? (
          <button
            className="bg-black bg-opacity-50 text-white rounded-full p-3"
            onClick={handlePlayPause}
          >
            Pause
          </button>
        ) : (
          <button
            className="bg-black bg-opacity-50 text-white rounded-full p-3"
            onClick={handlePlayPause}
          >
            Play
          </button>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;
