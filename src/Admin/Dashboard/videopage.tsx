"use client";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { getAllVideo } from "../../Api/getAllVideo";
import { deleteVideo } from "../../Api/videoDelete";
import VideoTable from "../../component/videotable";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();

const VideoPage = () => {
  const navigate = useNavigate();
  const { mutate } = deleteVideo();
  const { data: video, refetch } = getAllVideo();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "id",
        cell: (info) => info.getValue().id || "",
        header: "ID",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "videourl",
        cell: (info) => info.getValue().videourl || "",
        header: "VideoURL",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "description",
        cell: (info) => info.getValue().description || "",
        header: "Video Description",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "views",
        cell: (info) => info.getValue().views || "",
        header: "Total Views",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "like",
        cell: (info) => info.getValue().likeVideo || "",
        header: "Total Like",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "teacherName",
        cell: (info) => info.getValue().teachername || "",
        header: "Teacher Name",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "actions",
        cell: (info) => {
          return (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-md text-white mr-2"
                onClick={() => handleEdit(info.getValue().id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 p-1 px-2 rounded-md text-white"
                onClick={() => handleDelete(info.getValue().id)}
              >
                Delete
              </button>
            </>
          );
        },
      }),
    ];
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/dashboard/videoeditpage/${id}`);
  };

  const handleDelete = async (id: string) => {
    await mutate(id);
    refetch();
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-primary-500 py-5">Video Data</h1>
      <VideoTable columns={columns} data={video ?? []} />
    </div>
  );
};

export default VideoPage;
