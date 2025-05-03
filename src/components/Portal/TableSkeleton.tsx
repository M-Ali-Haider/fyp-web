import React from "react";

const headers = [
  "Patient Name",
  "Patient ID",
  "Contact Number",
  "Email",
  "Status",
];

const TableSkeleton = () => {
  return (
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
        {[...Array(5)].map((row, rowIndex, arr) => (
          <tr
            key={rowIndex}
            className={`${
              rowIndex !== arr.length - 1
                ? "border-b border-primary-border"
                : ""
            } hover:bg-black/10 transition-all duration-300 cursor-pointer`}
          >
            {[...Array(5)].map((cell, index) => (
              <td key={index} className="h-[60px] p-4 font-noto-sans text-sm ">
                <div className="text-transparent bg-gray-200 animate-pulse rounded-full">
                  Name
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
