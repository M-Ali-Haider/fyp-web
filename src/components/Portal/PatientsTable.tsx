import React from "react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Patient } from "@/context/GetPatients";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper<Patient>();

const columns = [
  columnHelper.accessor("name", {
    header: "Patient Name",
    cell: (info) => (
      <div className="flex gap-2 items-center">
        <div className="size-9 min-w-9 min-h-9 rounded-full bg-gray-300"></div>
        <span className="font-bold">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("id", {
    header: "Patient ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone_number", {
    header: "Contact Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => <span className="text-link">{info.getValue()}</span>,
  }),
  columnHelper.accessor("online", {
    header: "Status",
    cell: (info) => (
      <span
        className={`${
          info.getValue()
            ? "bg-green-bg text-green-textbh"
            : "bg-offline-bg text-offline-text"
        } py-1 px-3 rounded-3xl`}
      >
        {info.getValue() ? "Online" : "Offline"}
      </span>
    ),
  }),
];

const PatientsTable = ({ data }: { data: Patient[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-primary-border">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="text-secondary-text text-xs text-start font-dmSans font-semibold p-4"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, rowIndex, arr) => (
          <tr
            onClick={() => router.push("/")}
            key={row.id}
            className={`${
              rowIndex !== arr.length - 1
                ? "border-b border-primary-border"
                : ""
            } hover:bg-black/10 transition-all duration-300 cursor-pointer`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="h-[60px] p-4 font-noto-sans text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientsTable;
