import React from "react";
import { useTheme } from "next-themes";
import { ExpandTop } from "./icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OutputWindow = ({ outputDetails }: any) => {
  const { theme } = useTheme();
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500 dark:text-red-400">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500 dark:text-green-400">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500 dark:text-red-400">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500 dark:text-red-400">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <div className="w-full bg-slate-200 dark:bg-gray-800 p-1 flex justify-between items-center px-3 border-t border-l border-gray-300 dark:border-gray-700">
        <span className="text-[13px] font-mono font-semibold">Output</span>
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <ExpandTop
            className="w-4 h-4"
            color={theme === "dark" ? "#ffffff" : "#000000"}
          />
        </button>
      </div>
      <div className="w-full h-56 bg-slate-50 dark:bg-gray-800 text-white font-normal text-sm overflow-y-auto dark:text-white border border-gray-300 cursor-not-allowed">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
