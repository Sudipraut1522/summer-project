import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { video } from "../Api/getAllVideo";
import { countViews } from "../Api/videoViews";
import userLike from "../Api/lvideoLike";
import { watchHistory } from "../Api/watchHistory";
import {
  HandThumbUpIcon,
  EyeIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

interface Video {
  id: string;
  likeVideo: number;
  views: number | null;
  videourl: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
}

const Home: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Video[], Error>({
    queryKey: ["videos"],
    queryFn: video,
  });

  const { mutate: likeVideo } = userLike();
  const { mutate: recordWatchHistory } = watchHistory();
  const { mutate: updateViews } = countViews();

  const [visibleVideos, setVisibleVideos] = useState<{ [key: string]: number }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [videoCount, setVideoCount] = useState(4);

  useEffect(() => {
    const watchedVideosFromStorage = localStorage.getItem("watchedVideos");
    if (watchedVideosFromStorage) {
      setWatchedVideos(JSON.parse(watchedVideosFromStorage));
    }
  }, []);

  const markVideoAsWatched = (videoId: string) => {
    const updatedWatchedVideos = [...watchedVideos, videoId];
    setWatchedVideos(updatedWatchedVideos);
    localStorage.setItem("watchedVideos", JSON.stringify(updatedWatchedVideos));
  };

  const handleVideoPlay = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
      updateViews(videoId);
      recordWatchHistory(videoId);
      markVideoAsWatched(videoId);
    }
  };

  const handleLike = (videoId: string) => {
    likeVideo(videoId);
    setLikedVideos((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleShowMore = (
    category: string | null,
    subCategory: string | null
  ) => {
    const key = `${category}-${subCategory}`;
    setVisibleVideos((prevVisibleVideos) => ({
      ...prevVisibleVideos,
      [key]: (prevVisibleVideos[key] || 0) + 4,
    }));
  };

  const resetCategory = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching videos</div>;

  let filteredVideos = data;

  if (searchTerm) {
    filteredVideos = data?.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const categories = filteredVideos
    ? filteredVideos.reduce((acc, video) => {
        if (!acc[video.category]) acc[video.category] = new Set<string>();
        acc[video.category].add(video.subCategory);
        return acc;
      }, {} as Record<string, Set<string>>)
    : {};

  const visibleCategoryVideos =
    selectedCategory !== null && selectedSubCategory !== null
      ? filteredVideos?.filter(
          (video) =>
            video.category === selectedCategory &&
            video.subCategory === selectedSubCategory
        )
      : filteredVideos?.slice(
          0,
          visibleVideos[`${selectedCategory}-${selectedSubCategory}`] ||
            videoCount
        );

  return (
    <div className="w-full flex flex-col md:flex-row">
      <Sidebar
        categories={categories}
        onSubCategoryClick={handleSubCategoryClick}
        resetCategory={resetCategory}
      />
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
              <span className="text-gray-600">Watch History</span>
            </button>
          </NavLink>
        </div>

        {selectedCategory && selectedSubCategory && (
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory} - {selectedSubCategory}
          </h2>
        )}

        <div className="flex flex-wrap">
          {visibleCategoryVideos?.map((video, index) => (
            <div key={index} className="w-1/4 p-2" style={{ flexBasis: "25%" }}>
              <div className="bg-white rounded-md overflow-hidden shadow-md">
                <NavLink to={`video/${video.id}`}>
                  <ReactPlayer
                    url={video.videourl}
                    width="100%"
                    height="auto"
                    onStart={() => handleVideoPlay(video.id)}
                  />
                </NavLink>
                <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
                  <button
                    onClick={() => handleLike(video.id)}
                    className={`flex gap-2 items-center ${
                      likedVideos[video.id] ? "text-blue-500" : ""
                    }`}
                  >
                    <HandThumbUpIcon height={20} className="text-blue-700" />
                    <span className="text-sm">{video.likeVideo}</span>
                  </button>
                  <div className="flex gap-2 items-center">
                    <EyeIcon height={20} className="text-gray-500" />
                    <span className="text-sm">{video.views ?? 0}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
                  <p className="text-gray-600">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleCategoryVideos && visibleCategoryVideos.length >= 4 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() =>
                handleShowMore(selectedCategory, selectedSubCategory)
              }
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface SidebarProps {
  resetCategory: () => void;
  categories: Record<string, Set<string>>;
  onSubCategoryClick: (category: string, subCategory: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  resetCategory,
  categories,
  onSubCategoryClick,
}) => {
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const handleClickCategory = (category: string) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  const handleClickSubCategory = (category: string, subCategory: string) => {
    onSubCategoryClick(category, subCategory);
    const element = document.getElementById(`${category}-${subCategory}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4 p-4 bg-gray-100 text-gray-700 h-screen w-64">
      <h2 className="text-2xl font-bold">Categories</h2>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => resetCategory()}
      >
        <h3 className="text-xl font-semibold mb-2">All Video</h3>
      </div>
      {Object.entries(categories).map(([category, subCategories], index) => (
        <div key={index} className="w-full">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleClickCategory(category)}
          >
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            {openCategories[category] ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </div>
          {openCategories[category] && (
            <div className="ml-4">
              {[...subCategories].map((subCategory) => (
                <div
                  key={subCategory}
                  className="w-full bg-white rounded-md overflow-hidden shadow-md mb-2"
                >
                  <button
                    onClick={() =>
                      handleClickSubCategory(category, subCategory)
                    }
                    className="block py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 w-full text-left"
                  >
                    {subCategory}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
