"use client";
import React, { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../component/table";
import { getAllVideo } from "../Api/getAllVideo";
const columnHelper = createColumnHelper();

const VideoPage = () => {
  const { data: video } = getAllVideo();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "name",
        cell: (info) => info.getValue().id || "",
        header: "ID",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "name",
        cell: (info) => info.getValue().username || "",
        header: "UserName",
      }),

      columnHelper.accessor((row: any) => row, {
        id: "email",
        cell: (info) => info.getValue().email || "",
        header: "User email",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "email",
        cell: (info) => info.getValue().password || "",
        header: "User email",
      }),
      columnHelper.accessor((row: any) => row.isSuspended, {
        id: "status",

        cell: (info) => {
          return info.getValue() ? (
            <button className="text-red-500 ">suspended</button>
          ) : (
            <button className="text-green-500  ">active</button>
          );
        },
        header: "Status",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "actions",
        cell: (info) => {
          return (
            <>
              {info.getValue().isSuspended ? (
                <button
                  className="bg-green-500 hover:bg-green-600 p-1 px-2 rounded-md text-white"
                  onClick={() => info.getValue().id}
                >
                  activate
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-600 p-1 px-2 rounded-md text-white"
                  onClick={() => info.getValue().id}
                >
                  suspend
                </button>
              )}
            </>
          );
        },
      }),
    ];
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl text-primary-500 py-5">Users</h1>

      <Table columns={columns} data={video ?? []} />
    </div>
  );
};

export default VideoPage;
