import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OutputDetails = ({ outputDetails }: any) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3 text-sm p-2">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-50 dark:bg-slate-900 dark:text-white">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-50 dark:bg-slate-900 dark:text-white">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-50 dark:bg-slate-900 dark:text-white">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
