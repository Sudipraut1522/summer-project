import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { video } from "../Api/getAllVideo";
import { countViews } from "../Api/videoViews";
import userLike from "../Api/lvideoLike";
import { watchHistory } from "../Api/watchHistory";
import {
  HandThumbUpIcon,
  EyeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

interface Video {
  id: any;
  likeVideo: number;
  views: number;
  videourl: string;
  title: string;
  description: string;
  category: string;
}

const Home: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Video[], Error>({
    queryKey: ["videos"],
    queryFn: video,
  });

  const { mutate } = userLike();
  const { mutate: recordWatchHistory } = watchHistory();

  const [visibleVideos, setVisibleVideos] = useState<{ [key: string]: number }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);

  const { mutate: updateViews } = countViews();

  const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleShowMore = (category: string) => {
    setVisibleVideos((prevVisibleVideos) => ({
      ...prevVisibleVideos,
      [category]: (prevVisibleVideos[category] || 0) + 4,
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const watchedVideosFromStorage = localStorage.getItem("watchedVideos");
    if (watchedVideosFromStorage) {
      setWatchedVideos(JSON.parse(watchedVideosFromStorage));
    }
  }, []);

  const markVideoAsWatched = (videoId: string) => {
    setWatchedVideos((prevWatchedVideos) => [...prevWatchedVideos, videoId]);
    localStorage.setItem(
      "watchedVideos",
      JSON.stringify([...watchedVideos, videoId])
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching videos</div>;

  let filteredVideos = data;

  if (searchTerm) {
    filteredVideos = data?.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const categories = [
    ...new Set(filteredVideos?.map((video) => video.category)),
  ];

  const handleVideoPlay = (id: any) => {
    if (!watchedVideos.includes(id)) {
      updateViews(id);
      recordWatchHistory(id);
      markVideoAsWatched(id);
    }
  };

  const handelLike = (id: any) => {
    mutate(id);
  };

  const watchHistroyPage = () => {
    // router("/watchhistory");
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="">
        <Sidebar data={filteredVideos ?? []} categories={categories} />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="px-4 py-2 border border-gray-300 rounded-md w-96"
            value={searchTerm}
            onChange={handleSearch}
          />
          <NavLink to={"watchhistory"}>
            <button className="flex items-center bg-gray-200 px-3 py-2 rounded-md">
              <ClockIcon className="w-5 h-5 mr-1 text-gray-600" />
              <span className="text-gray-600" onClick={watchHistroyPage}>
                Watch History
              </span>
            </button>
          </NavLink>
        </div>
        {categories.map((category) => {
          const categoryVideos = filteredVideos?.filter(
            (video) => video.category === category
          );
          const visibleCount = visibleVideos[category] || 4;
          const videosToShow = categoryVideos?.slice(0, visibleCount) || [];

          return (
            <div key={category} id={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="flex flex-wrap">
                {videosToShow.map((video, index) => (
                  <div
                    key={index}
                    className="w-1/4 p-2"
                    style={{ flexBasis: "25%" }}
                  >
                    <div className="bg-white rounded-md overflow-hidden shadow-md">
                      <div className="video-container">
                        <video
                          controls
                          className="video-player"
                          onPlay={() => handleVideoPlay(video.id)}
                        >
                          <source src={video.videourl} />
                        </video>
                        <div className="opacity-45 flex justify-between items-center px-4 py-2 bg-gray-200">
                          <button
                            onClick={() => handelLike(video.id)}
                            className={`flex gap-2 items-center ${
                              likedVideos[video.id] ? "text-blue-500" : ""
                            }`}
                          >
                            <HandThumbUpIcon
                              height={20}
                              className="text-blue-700"
                            />
                            <span className="text-sm">{video.likeVideo}</span>
                          </button>
                          <div className="flex gap-2 items-center">
                            <EyeIcon height={20} className="text-gray-500" />
                            <span className="text-sm">{video.views}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600">{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {categoryVideos && categoryVideos.length > visibleCount && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleShowMore(category)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SidebarProps {
  data: Video[];
  categories: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ data, categories }) => {
  const handleClickCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4 p-4 bg-gray-100 text-gray-700 h-screen w-64">
      <h2 className="text-2xl font-bold">Categories</h2>

      {categories.map((category, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-md overflow-hidden shadow-md h-auto"
          onClick={() => handleClickCategory(category)}
        >
          <button className="block py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300">
            {category}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
