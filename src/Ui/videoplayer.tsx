// import ReactPlayer from "react-player";
// import { useParams } from "react-router-dom";
// import { getVideo } from "../Api/getvideo";
// import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
// import userLike from "../Api/lvideoLike";
// import { useEffect, useState } from "react";
// import { watchHistory } from "../Api/watchHistory";
// import { countViews } from "../Api/videoViews";

// const GetVideoByID = () => {
//   const { id } = useParams();

//   const { mutate } = userLike();
//   const { mutate: recordWatchHistory } = watchHistory();

//   const [visibleVideos, setVisibleVideos] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [watchedVideos, setWatchedVideos] = useState<string[]>([]);

//   const { mutate: updateViews } = countViews();

//   const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
//     {}
//   );

//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
//     null
//   );

//   const handleShowMore = (
//     category: string | null,
//     subCategory: string | null
//   ) => {
//     const key = `${category}-${subCategory}`;
//     setVisibleVideos((prevVisibleVideos) => ({
//       ...prevVisibleVideos,
//       [key]: (prevVisibleVideos[key] || 0) + 4,
//     }));
//   };

//   const resetCategory = () => {
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//   };
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     const watchedVideosFromStorage = localStorage.getItem("watchedVideos");
//     if (watchedVideosFromStorage) {
//       setWatchedVideos(JSON.parse(watchedVideosFromStorage));
//     }
//   }, []);

//   const markVideoAsWatched = (videoId: string) => {
//     setWatchedVideos((prevWatchedVideos) => [...prevWatchedVideos, videoId]);
//     localStorage.setItem(
//       "watchedVideos",
//       JSON.stringify([...watchedVideos, videoId])
//     );
//   };

//   const [videoCount, setVideoCount] = useState(4);

//   const showmoreVideo = () => {
//     handleShowMore(selectedCategory, selectedSubCategory);

//     setVideoCount(videoCount + 4);
//   };

//   const handleVideoPlay = (id: any) => {
//     if (!watchedVideos.includes(id)) {
//       updateViews(id);
//       recordWatchHistory(id);
//       markVideoAsWatched(id);
//     }
//   };

//   const handleSubCategoryClick = (category: string, subCategory: string) => {
//     setSelectedCategory(category);
//     setSelectedSubCategory(subCategory);
//   };

//   const { data: videoData } = getVideo(id);

//   const handleLike = (id: any) => {
//     mutate(id);
//     setLikedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (!videoData) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div
//         className="bg-white rounded-md overflow-hidden shadow-md"
//         style={{ width: "75vw" }}
//       >
//         <div
//           className="video-container relative"
//           style={{ paddingTop: "56.25%" }}
//         >
//           <ReactPlayer
//             url={videoData.videourl}
//             controls
//             width="100%"
//             height="100%"
//             onStart={() => handleVideoPlay(videoData.id)}
//           />
//           <div className="views-icon absolute top-0 right-0 m-4">
//             <EyeIcon height={20} className="text-gray-500" />
//             <span className="text-sm">{videoData.views ?? 0}</span>
//           </div>
//           <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
//             <button
//               onClick={() => handleLike(videoData.id)}
//               className={`flex gap-2 items-center ${
//                 likedVideos[videoData.id] ? "text-blue-500" : ""
//               }`}
//             >
//               <HandThumbUpIcon height={20} className="text-blue-700" />
//               <span className="text-sm">{videoData.likeVideo}</span>
//             </button>
//           </div>
//         </div>
//         {/* Video details */}
//         <div className="p-4">
//           <h4 className="text-lg font-semibold mb-2">{videoData.title}</h4>
//           <p className="text-gray-600">{videoData.description}</p>
//         </div>
//       </div>
//       {/* Second video container */}
//     </div>
//   );
// };

// export default GetVideoByID;
