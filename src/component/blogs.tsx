import React from "react";

interface TotalDataProps {
  totalVideos: number;
  totalUsers: number;
}

const TotalData: React.FC<TotalDataProps> = ({ totalVideos, totalUsers }) => {
  return (
    <div className="flex justify-around w-full">
      <div className="flex flex-col items-center">
        <div className="h-32 w-auto bg-slate-800 flex items-center justify-center text-white">
          Total Videos
        </div>
        <div className="text-gray-800">{totalVideos}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-32 w-auto bg-slate-800 flex items-center justify-center text-white">
          Total Users
        </div>
        <div className="text-gray-800">{totalUsers}</div>
      </div>
    </div>
  );
};

export default TotalData;
