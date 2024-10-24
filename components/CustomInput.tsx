import { useTheme } from "next-themes";
import clsx from "clsx";
import { ExpandBottom } from "./icons";

const CustomInput = ({
  customInput,
  setCustomInput,
}: {
  customInput: string;
  setCustomInput: (value: string) => void;
  position: "top" | "bottom";
}) => {
  const { theme } = useTheme();
  return (
    <>
      <div className="w-full bg-slate-200 dark:bg-gray-800 p-1 flex justify-between items-center px-3 border-b border-t border-gray-200 dark:border-gray-700">
        <span className="text-[13px] font-mono font-semibold">
          Custom Input
        </span>
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <ExpandBottom
            className="w-4 h-4"
            color={theme === "dark" ? "#ffffff" : "#000000"}
          />
        </button>
      </div>
      <textarea
        rows={8}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        className={clsx(
          "focus:outline-none w-full border border-gray-300 z-10 px-4 py-2 transition duration-200 bg-slate-50 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
