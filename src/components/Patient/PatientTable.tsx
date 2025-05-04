import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface SeizureData {
  date: string;
  day: string;
  time: string;
}

const columnHelper = createColumnHelper<SeizureData>();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("day", {
    header: "Day",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("time", {
    header: "Time",
    cell: (info) => info.getValue(),
  }),
];

const PatientTable = ({ data }: { data: SeizureData[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-end text-sm text-secondary-text font-noto-sans leading-[20px]">
        <span className="mr-2">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="size-8 hover:bg-black/10 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center rounded-full disabled:opacity-50"
        >
          <ChevronLeftIcon size={24} />
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="size-8 hover:bg-black/10 cursor-pointer flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>

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
              key={row.id}
              className={`${
                rowIndex !== arr.length - 1
                  ? "border-b border-primary-border"
                  : ""
              } hover:bg-black/10 transition-all duration-300`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="h-[60px] p-4 font-noto-sans text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;

const headers = ["Date", "Day", "Time"];

export const PatientTableSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-end text-sm text-secondary-text font-noto-sans leading-[20px]">
        <span className="mr-2 text-transparent bg-gray-200 animate-pulse rounded-full">
          1-3
        </span>
        <div className="size-8 text-transparent bg-gray-200 animate-pulse rounded-full" />
        <div className="size-8 text-transparent bg-gray-200 animate-pulse rounded-full" />
      </div>
      <table className="w-full">
        <thead>
          {[...Array(1)].map((headerGroup, index) => (
            <tr key={index} className="border-b border-primary-border">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-xs text-start font-dmSans font-semibold p-4 text-secondary-text"
                >
                  {header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {[...Array(7)].map((row, rowIndex, arr) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex !== arr.length - 1
                  ? "border-b border-primary-border"
                  : ""
              } hover:bg-black/10 transition-all duration-300 cursor-pointer`}
            >
              {headers.map((_, index) => (
                <td
                  key={index}
                  className="h-[60px] p-4 font-noto-sans text-sm "
                >
                  <div className="text-transparent bg-gray-200 animate-pulse rounded-full">
                    Name
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
