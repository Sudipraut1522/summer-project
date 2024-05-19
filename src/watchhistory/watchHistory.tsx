import React from "react";
import { userWatchHistory } from "../Api/userHistory";

interface HistoryItem {
  id: number;
  videoId: string;
  videoUrl: string;
  category: string;
  teachername: string;
  views: number;
  title: string;
}

const categoryStyles: { [key: string]: string } = {
  Math: "bg-blue-100 border-blue-500",
  Science: "bg-green-100 border-green-500",
  History: "bg-yellow-100 border-yellow-500",
  Art: "bg-pink-100 border-pink-500",
};

const History: React.FC = () => {
  const { data, isLoading, isError } = userWatchHistory();
  console.log("watch history", data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: Failed to fetch watch history</p>;

  const watchHistory: HistoryItem[] = data || [];

  const groupedByCategory = watchHistory.reduce(
    (acc: { [key: string]: HistoryItem[] }, item: HistoryItem) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Watch History</h1>
      {Object.entries(groupedByCategory).map(([category, videos]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((history: HistoryItem) => (
              <div
                key={history.id}
                className={`shadow-md rounded-lg overflow-hidden border-2 ${
                  categoryStyles[history.category] ||
                  "bg-gray-100 border-gray-300"
                }`}
              >
                <video
                  src={history.videoUrl}
                  className="w-full h-auto"
                  controls
                ></video>
                <div className="p-4">
                  <p className="text-lg font-semibold mb-2">{history.title}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <p>Teacher: {history.teachername}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Views: {history.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
