import React from "react";
import { ExpandTop } from "./icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OutputWindow = ({ outputDetails }: any) => {
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-mono text-xs text-brand-red">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-mono text-xs text-brand-green">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-mono text-xs text-brand-red">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-mono text-xs text-brand-red">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between px-3 py-1.5 bg-obsidian-surface border-b border-border-default shrink-0">
        <span className="text-xs text-ink-muted uppercase tracking-wider font-mono">Output</span>
        <button className="p-1 hover:bg-obsidian-overlay rounded text-ink-faint hover:text-ink-primary transition-colors">
          <ExpandTop className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-obsidian-base p-2 min-h-0">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default OutputWindow;
