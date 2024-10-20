import React from "react";
import clsx from "clsx";

const CustomInput = ({
  customInput,
  setCustomInput,
}: {
  customInput: string;
  setCustomInput: (value: string) => void;
}) => {
  return (
    <>
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={clsx(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 bg-white mt-2 mb-4"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
