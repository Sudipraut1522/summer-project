import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getReport } from "../../Api/report";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportPage = () => {
  const { data, isLoading, error } = getReport();

  console.log("getreport", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching report data: {error.message}</div>;
  }

  const chartData = {
    labels: [
      "Total Users",
      "Total Videos",
      "Total Likes",
      "Total Views",
      "Most Watch Video",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          data.totaluser,
          data.totalVideo,
          data.totalLike,
          data.totalViews,
          data.mostViews.views,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Video Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p>{data.totaluser}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total Videos</h2>
          <p>{data.totalVideo}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total Likes</h2>
          <p>{data.totalLike}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total Views</h2>
          <p>{data.totalViews}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Most Watched Video</h2>
          <div className="flex gap-4">
            {/* {/* <p>{data.mostViews.subCategory}</p> */}
            <p>{data.mostViews.subCategory}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Most Liked Video</h2>
          <p>{data.mostlike.subCategory}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Least Watched Video</h2>
          {/* <p>{data.leastViews.subCategory}</p>
          <p>{data.leastViews.category}</p> */}
        </div>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Video Performance</h2>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ReportPage;
