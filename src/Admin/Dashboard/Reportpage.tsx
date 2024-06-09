import { getReport } from "../../Api/report";

const ReportPage = () => {
  const { data, isLoading, error } = getReport();

  console.log("getreport", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching report data: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Video Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total Videos</h2>
          <p>{data.totaluser}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Most Liked Video</h2>
          <p>{data.totalVideo}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Most Viewed Video</h2>
          <p>{data.totalViews}</p>
        </div>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Video Performance</h2>
        {/* <Bar data={chartData} /> */}
      </div>
    </div>
  );
};

export default ReportPage;
