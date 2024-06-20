"use client";
import { useMemo, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { getAllUser } from "../../Api/getallUsers";
import { userDelete } from "../../Api/userDelete";
import UserTable from "../../component/Search/usertable";
import { getApproved } from "../../Api/approvedRegister";

const columnHelper = createColumnHelper();

const UserPage = () => {
  const { data: userdata, refetch, isLoading, isError } = getAllUser();
  const { mutate } = userDelete();
  const { mutate: isApproved } = getApproved();

  const [approvedUsers, setApprovedUsers] = useState(new Set());

  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "id",
        cell: (info) => info.getValue().id || "",
        header: "ID",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "username",
        cell: (info) => info.getValue().username || "",
        header: "Username",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "email",
        cell: (info) => info.getValue().email || "",
        header: "Email",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "imageurl",
        cell: (info) => (
          <img
            src={info.getValue().imageurl}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        ),
        header: "Image",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "createdAt",
        cell: (info) =>
          new Date(info.getValue().createdAt).toLocaleString() || "",
        header: "Created At",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "updatedAt",
        cell: (info) =>
          new Date(info.getValue().updatedAt).toLocaleString() || "",
        header: "Updated At",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "isAdmin",
        cell: (info) => (info.getValue().isAdmin ? "Yes" : "No") || "No",
        header: "Admin",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "isApproved",
        cell: (info) =>
          (approvedUsers.has(info.getValue().id) ? "Yes" : "No") || "No",
        header: "Approved",
      }),
      columnHelper.accessor((row: any) => row, {
        id: "actions",
        cell: (info) => (
          <>
            <button
              className="bg-red-500 hover:bg-red-600 p-1 px-2 rounded-md text-white mr-2"
              onClick={() => handleDelete(info.getValue().id)}
            >
              Reject
            </button>
            {!approvedUsers.has(info.getValue().id) && (
              <button
                className="bg-green-500 hover:bg-green-600 p-1 px-2 rounded-md text-white"
                onClick={() => handleApprove(info.getValue().id)}
              >
                Approve
              </button>
            )}
          </>
        ),
        header: "Actions",
      }),
    ];
  }, [approvedUsers]); // Depend on approvedUsers for useMemo to update columns when approved status changes

  const handleDelete = async (id: any) => {
    await mutate(id);
    refetch();
  };

  const handleApprove = async (id: any) => {
    try {
      await isApproved(id);
      setApprovedUsers((prevApprovedUsers) =>
        new Set(prevApprovedUsers).add(id)
      );
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-xl text-primary-500 py-5">User Data</h1>
      <UserTable columns={columns} data={userdata ?? []} />
    </div>
  );
};

export default UserPage;
