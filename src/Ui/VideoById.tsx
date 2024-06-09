import ReactPlayer from "react-player";
import { useParams, useNavigate } from "react-router-dom";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import userLike from "../Api/lvideoLike";
import { useEffect, useState } from "react";
import { watchHistory } from "../Api/watchHistory";
import { countViews } from "../Api/videoViews";
import { getVideoById } from "../Api/getvideobyid";
import { getAllVideo } from "../Api/getAllVideo";

const GetVideoByID = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is always a string
  const navigate = useNavigate();
  const { mutate } = userLike();
  const { mutate: recordWatchHistory } = watchHistory();
  const { mutate: updateViews } = countViews();

  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [similarVideos, setSimilarVideos] = useState<any[]>([]);

  const { data: videoData, isLoading: isVideoLoading } = getVideoById(id!);
  const { data: allVideos, isLoading: isAllVideosLoading } = getAllVideo();

  useEffect(() => {
    const watchedVideosFromStorage = localStorage.getItem("watchedVideos");
    if (watchedVideosFromStorage) {
      setWatchedVideos(JSON.parse(watchedVideosFromStorage));
    }
  }, []);
  console.log("videoData", videoData);
  useEffect(() => {
    if (allVideos && videoData) {
      const filteredVideos = allVideos.filter(
        (video: any) =>
          video.subCategory === videoData.subCategory && video.id !== id
      );
      setSimilarVideos(filteredVideos);
    }
  }, [allVideos, videoData, id]);

  const markVideoAsWatched = (videoId: string) => {
    setWatchedVideos((prevWatchedVideos) => [...prevWatchedVideos, videoId]);
    localStorage.setItem(
      "watchedVideos",
      JSON.stringify([...watchedVideos, videoId])
    );
  };

  const handleVideoPlay = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
      updateViews(videoId);
      recordWatchHistory(videoId);
      markVideoAsWatched(videoId);
    }
  };

  const handleVideoEnd = () => {
    const currentIndex = similarVideos.findIndex(
      (video) => video.id === parseInt(id!)
    );
    const nextVideo = similarVideos[currentIndex + 1];
    if (nextVideo) {
      navigate(`/home/video/${nextVideo.id}`);
    }
  };

  const handleLike = (videoId: string) => {
    mutate(videoId);
    setLikedVideos((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const handleRecommendedVideoClick = (videoId: string) => {
    navigate(`/home/video/${videoId}`);
  };

  if (isVideoLoading || isAllVideosLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      <div className="bg-white rounded-md shadow-md overflow-hidden w-full lg:w-[70%] p-4">
        <div className="video-container relative mb-4">
          <div className="text-xl font-bold mb-2">
            {videoData.subCategory.toUpperCase()}
          </div>
          <ReactPlayer
            url={videoData.videourl}
            controls
            width="100%"
            height="600px"
            onStart={() => handleVideoPlay(videoData.id)}
            onEnded={handleVideoEnd}
          />
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200 mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLike(videoData.id)}
                className={`flex gap-2 items-center ${
                  likedVideos[videoData.id] ? "text-blue-500" : ""
                }`}
              >
                <HandThumbUpIcon height={20} className="text-blue-700" />
                <span className="text-sm">{videoData.likeVideo}</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <EyeIcon height={20} className="text-gray-500" />
              <span className="text-sm text-gray-500">
                {videoData.views ?? 0}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-2">{videoData.title}</h4>
          <p className="text-gray-600">{videoData.description}</p>
        </div>
      </div>

      <div className="w-full lg:w-[30%]">
        <h1 className="text-2xl font-bold mb-4">Recommended Videos</h1>
        {similarVideos.map((video: any) => (
          <div
            key={video.id}
            className="bg-white rounded-md shadow-md overflow-hidden mb-4 p-4"
          >
            <div className="video-container relative mb-4">
              <div className="text-lg font-bold mb-2">{video.subCategory}</div>
              <ReactPlayer
                url={video.videourl}
                width="100%"
                height="180px" // Reduced height for recommended videos
                onStart={() => handleVideoPlay(video.id)}
              />
              <div className="flex justify-between items-center px-4 py-2 bg-gray-200 mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(video.id)}
                    className={`flex gap-2 items-center ${
                      likedVideos[video.id] ? "text-blue-500" : ""
                    }`}
                  >
                    <HandThumbUpIcon height={20} className="text-blue-700" />
                    <span className="text-sm">{video.likeVideo}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <EyeIcon height={20} className="text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {video.views ?? 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
              <p className="text-gray-600">{video.description}</p>
              <button
                onClick={() => handleRecommendedVideoClick(video.id)}
                className="mt-2 text-blue-500"
              >
                Watch Video
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetVideoByID;
