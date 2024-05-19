import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { NavLink } from "react-router-dom";

export default function VideoTable({
  data,
  columns,
  noDataMessage,
}: {
  data: any;
  columns: ColumnDef<any, any>[];
  noDataMessage?: string | null;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredData = React.useMemo(
    () =>
      data.filter((item: any) =>
        item.teachername
          ? item.teachername.toLowerCase().includes(searchQuery.toLowerCase())
          : false
      ),
    [data, searchQuery]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="p-1 bg-milky rounded-md shadow-xl">
        <div className="mb-4 flex items-center p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by TeacherName"
            className="px-4 py-2 border rounded-md w-full"
          />
          <NavLink to="/dashboard/videoupload">
            <button className="ml-2 px-4  bg-red-600 text-white rounded-md hover:bg-blue-600">
              Add Video
            </button>
          </NavLink>
        </div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    scope="col"
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    style={{
                      position: "relative",
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "flex cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUpIcon width={15} />,
                          desc: <ArrowDownIcon width={15} />,
                        }[header.column.getIsSorted() as string] ?? null}
                        {!header.column.getIsSorted() && (
                          <ChevronUpDownIcon width={15} />
                        )}
                      </div>
                    )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                      ></div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  className="p-4 font-semibold text-center"
                  colSpan={columns.length}
                >
                  {noDataMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
