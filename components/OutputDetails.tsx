import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OutputDetails = ({ outputDetails }: any) => {
  return (
    <div className="flex items-center gap-4 px-3 py-2 bg-obsidian-surface border-t border-border-default text-xs shrink-0">
      <p className="text-ink-faint">
        Status:{" "}
        <span className="text-ink-primary font-mono ml-1">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-ink-faint">
        Memory:{" "}
        <span className="text-ink-primary font-mono ml-1">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-ink-faint">
        Time:{" "}
        <span className="text-ink-primary font-mono ml-1">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
