import ReactPlayer from "react-player";
import { useParams, useNavigate } from "react-router-dom";
import {
  EyeIcon as OutlineEyeIcon,
  HandThumbUpIcon as OutlineHandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  EyeIcon as SolidEyeIcon,
  HandThumbUpIcon as SolidHandThumbUpIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";
import userLike from "../Api/lvideoLike";
import { useEffect, useState, useRef } from "react";
import { watchHistory } from "../Api/watchHistory";
import { countViews } from "../Api/videoViews";
import { getVideoById } from "../Api/getvideobyid";
import { getAllVideo } from "../Api/getAllVideo";
import InputField from "../component/Input/Inputfield";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tcomment, commentSchema } from "../schema/Commentschema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../component/Button/Button";
import getAllUserProfile from "../Api/userProfile";
import ViewsAllComment from "../component/model/ViewsAllComment";
import { usePostComment } from "../Api/userComments";

const GetVideoByID = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: likeVideo } = userLike();
  const { mutate: recordWatchHistory } = watchHistory();
  const { mutate: updateViews } = countViews();
  const { data: userProfile } = getAllUserProfile();

  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [userComment, setUserComment] = useState<Boolean>(false);
  const [similarVideos, setSimilarVideos] = useState<any[]>([]);
  const [hasCountedView, setHasCountedView] = useState(false);

  const { data: videoData, isLoading: isVideoLoading } = getVideoById(id!);
  const { data: allVideos, isLoading: isAllVideosLoading } = getAllVideo();

  const playerRef = useRef<ReactPlayer | null>(null);

  const toggleUserComment = () => {
    setUserComment((prevState) => !prevState);
  };

  useEffect(() => {
    const watchedVideosFromStorage = localStorage.getItem("watchedVideos");
    if (watchedVideosFromStorage) {
      setWatchedVideos(JSON.parse(watchedVideosFromStorage));
    }
  }, []);

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
    if (!hasCountedView && !watchedVideos.includes(videoId)) {
      setTimeout(() => {
        updateViews(videoId);
        recordWatchHistory(videoId);
        markVideoAsWatched(videoId);
        setHasCountedView(true);
      }, 5000);
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
    likeVideo(videoId);
    setLikedVideos((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const handleRecommendedVideoClick = (videoId: string) => {
    navigate(`/home/video/${videoId}`);
  };

  const seekBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() - 10,
        "seconds"
      );
    }
  };

  const seekForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() + 10,
        "seconds"
      );
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Tcomment>({
    resolver: zodResolver(commentSchema),

    defaultValues: {
      comment: "",
    },
  });

  const { mutate: usercomment, isSuccess } = usePostComment();
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [reset, isSuccess]);

  const onSubmit: SubmitHandler<Tcomment> = async (data) => {
    usercomment({ ...data, ID: id });
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
      <div className="flex flex-col w-full lg:w-[70%]">
        <div className="bg-white rounded-md shadow-md overflow-hidden mb-4">
          <ReactPlayer
            ref={playerRef}
            url={`${videoData.videourl}`}
            controls
            width="100%"
            height="600px"
            onStart={() => handleVideoPlay(videoData.id)}
            onEnded={handleVideoEnd}
          />
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={seekBackward}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <BackwardIcon height={24} />
            <span>Back 10s</span>
          </button>
          <button
            onClick={seekForward}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <ForwardIcon height={24} />
            <span>Forward 10s</span>
          </button>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h4 className="text-xl font-semibold mb-2">{videoData.title}</h4>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLike(videoData.id)}
                className={`flex gap-2 items-center hover:text-blue-700 transition ${
                  likedVideos[videoData.id] ? "text-blue-500" : ""
                }`}
              >
                {likedVideos[videoData.id] ? (
                  <SolidHandThumbUpIcon height={24} />
                ) : (
                  <OutlineHandThumbUpIcon height={24} />
                )}
                <span>{videoData.likeVideo}</span>
              </button>
              <div className="flex items-center gap-2">
                <SolidEyeIcon height={24} className="text-gray-500" />
                <span>{videoData.views ?? 0}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">{videoData.description}</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4 mt-4">
          <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="mt-12">
                <img
                  src={userProfile?.imageurl}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-1">
                <InputField
                  placeholder="Add your comment..."
                  type="text"
                  name="comment"
                  register={register}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-red-600 mt-1">
                  {errors?.comment?.message}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                text="Submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              />
            </div>
          </form>
          <div className="bg-white rounded-md shadow-md p-4 mt-4">
            <Button
              onClick={toggleUserComment}
              text={userComment ? "Hide Comments" : "View Comments"}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            />
            {userComment && <ViewsAllComment />}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[30%]">
        <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
        {similarVideos.map((video: any) => (
          <div
            key={video.id}
            className="bg-white rounded-md shadow-md mb-4 p-4 cursor-pointer"
            onClick={() => handleRecommendedVideoClick(video.id)}
          >
            <div className="mb-2">
              <ReactPlayer
                url={`${video.videourl}`}
                width="100%"
                height="180px"
              />
            </div>
            <h4 className="text-lg font-semibold mb-1">{video.title}</h4>
            <p className="text-gray-600 text-sm">{video.description}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                {likedVideos[video.id] ? (
                  <SolidHandThumbUpIcon height={20} className="text-blue-700" />
                ) : (
                  <OutlineHandThumbUpIcon
                    height={20}
                    className="text-blue-700"
                  />
                )}
                <span>{video.likeVideo}</span>
              </div>
              <div className="flex items-center gap-2">
                <SolidEyeIcon height={20} className="text-gray-500" />
                <span>{video.views ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetVideoByID;
