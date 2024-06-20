import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { getAllComment } from "../Api/getAllComment";
import Table from "../component/table";
import { useUserDeleteComment } from "../Api/deletecomment";

const columnHelper = createColumnHelper();

const UserComments = () => {
  const { mutate } = useUserDeleteComment();
  const { data, refetch } = getAllComment();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "id",
        cell: (info) => info.getValue().id || "",
        header: "ID",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "userId",
        cell: (info) => info.getValue().userId || "",
        header: "User ID",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "videoId",
        cell: (info) => info.getValue().videoId || "",
        header: "Video ID",
      }),

      columnHelper.accessor((row: any) => row, {
        id: "userName",
        cell: (info) => info.getValue().userName || "",
        header: "User Name",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "comment",
        cell: (info) => info.getValue().comment || "",
        header: "User Comment",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "userImage",
        cell: (info) => (
          <img
            src={info.getValue().userImage}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        ),
        header: "User Image",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "actions",
        cell: (info) => {
          return (
            <>
              <button
                className="bg-red-500 hover:bg-red-600 p-1 px-2 rounded-md text-white"
                onClick={() => handleDelete(info.getValue().id)}
              >
                Delete
              </button>
            </>
          );
        },
        header: "Actions",
      }),
    ];
  }, []);

  const handleDelete = async (id: string) => {
    await mutate(id);
    refetch();
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-primary-500 py-5">User Comments</h1>
      <Table
        columns={columns}
        data={data ?? []}
        noDataMessage="No comments available."
      />
    </div>
  );
};

export default UserComments;
