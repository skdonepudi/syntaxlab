"use client";
import React, { useState } from "react";
import { Copy, Check, PlayCircle } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OutputWindow = ({ outputDetails }: any) => {
  const [copied, setCopied] = useState(false);

  const getRawOutput = (): string | null => {
    const statusId = outputDetails?.status?.id;
    if (statusId === 6) return outputDetails?.compile_output ? atob(outputDetails.compile_output) : null;
    if (statusId === 3) return outputDetails?.stdout ? atob(outputDetails.stdout) : null;
    if (statusId === 5) return "Time Limit Exceeded";
    return outputDetails?.stderr ? atob(outputDetails.stderr) : null;
  };

  const getOutput = () => {
    const statusId = outputDetails?.status?.id;
    const raw = getRawOutput();
    if (statusId === 3) {
      return <pre className="px-3 py-2 font-mono text-xs text-brand-green leading-relaxed">{raw}</pre>;
    }
    if (statusId === 5) {
      return <pre className="px-3 py-2 font-mono text-xs text-brand-red leading-relaxed">Time Limit Exceeded</pre>;
    }
    return <pre className="px-3 py-2 font-mono text-xs text-brand-red leading-relaxed">{raw}</pre>;
  };

  const handleCopy = () => {
    const raw = getRawOutput();
    if (!raw) return;
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div className="flex items-center justify-between px-3 py-1.5 bg-obsidian-surface border-b border-border-default shrink-0">
        <span className="text-[10px] text-ink-faint uppercase tracking-widest font-mono">stdout</span>
        {outputDetails && (
          <button
            onClick={handleCopy}
            title="Copy output"
            className="p-1 hover:bg-obsidian-overlay rounded text-ink-faint hover:text-ink-primary transition-colors"
          >
            {copied ? <Check size={13} className="text-brand-green" /> : <Copy size={13} />}
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto bg-obsidian-base min-h-0">
        {outputDetails ? (
          getOutput()
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-ink-faint/40 select-none">
            <PlayCircle size={28} strokeWidth={1.25} />
            <span className="text-xs font-mono">Run code to see output</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputWindow;
