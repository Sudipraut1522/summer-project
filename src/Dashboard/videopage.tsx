"use client";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../component/table";
import { getAllVideo } from "../Api/getAllVideo";
import { deleteVideo } from "../Api/videoDelete";
const columnHelper = createColumnHelper();

const VideoPage = () => {
  const { mutate } = deleteVideo();
  const { data: video, refetch } = getAllVideo();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "name",
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
        header: "Total VIews",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "like",
        cell: (info) => info.getValue().like || "",
        header: "Total Like",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "teacherName",
        cell: (info) => info.getValue().teachername || "",
        header: "Teachername",
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
    // Handle edit action here, e.g., redirect to edit page
  };

  const handleDelete = async (id: string) => {
    await mutate(id);
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-primary-500 py-5">Users</h1>

      <Table columns={columns} data={video ?? []} />
    </div>
  );
};

export default VideoPage;
