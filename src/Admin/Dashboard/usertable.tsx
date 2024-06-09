"use client";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../component/table";
import { getAllUser } from "../../Api/getallUsers";
import { userDelete } from "../../Api/userDelete";
const columnHelper = createColumnHelper();

const UserPage = () => {
  const { mutate } = userDelete();
  const { data, refetch } = getAllUser();
  console.log("userimage", data);

  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "id",
        cell: (info) => info.getValue().id || "",
        header: "ID",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "name",
        cell: (info) => info.getValue().username || "",
        header: "UserName",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "image",
        cell: (info) => info.getValue().imageurl || "",
        header: "UserImaage",
      }),

      columnHelper.accessor((row: any) => row, {
        id: "email",
        cell: (info) => info.getValue().email || "",
        header: "Useremail",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "password",
        cell: (info) => info.getValue().password || "",
        header: "Userpasword",
      }),

      columnHelper.accessor((row: any) => row, {
        id: "actions",
        cell: (info) => {
          return (
            <button
              className="bg-red-500 hover:bg-red-600 p-1 px-2 rounded-md text-white"
              onClick={() => handleDelete(info.getValue().id)}
            >
              Delete
            </button>
          );
        },
      }),
    ];
  }, []);
  const handleEdit = (id: string) => {
    // Handle edit action here, e.g., redirect to edit page
  };

  const handleDelete = async (id: any) => {
    await mutate(id);
    refetch();
  };
  return (
    <div>
      <h1 className="font-bold text-xl text-primary-500 py-5">UsersData</h1>

      <Table columns={columns} data={data ?? []} />
    </div>
  );
};

export default UserPage;
