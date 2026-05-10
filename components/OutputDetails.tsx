import React from "react";
import { CheckCircle2, XCircle, Clock, Cpu } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OutputDetails = ({ outputDetails }: any) => {
  const statusId = outputDetails?.status?.id;
  const isSuccess = statusId === 3;
  const statusDesc = outputDetails?.status?.description;

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-obsidian-surface border-t border-border-default text-xs shrink-0 flex-wrap">
      {statusDesc && (
        <div className={`flex items-center gap-1.5 ${isSuccess ? "text-brand-green" : "text-brand-red"}`}>
          {isSuccess
            ? <CheckCircle2 size={12} strokeWidth={2} />
            : <XCircle size={12} strokeWidth={2} />}
          <span className="font-mono">{statusDesc}</span>
        </div>
      )}
      {outputDetails?.time && (
        <div className="flex items-center gap-1 text-ink-faint">
          <Clock size={11} strokeWidth={1.75} />
          <span className="font-mono text-ink-muted">{outputDetails.time}s</span>
        </div>
      )}
      {outputDetails?.memory && (
        <div className="flex items-center gap-1 text-ink-faint">
          <Cpu size={11} strokeWidth={1.75} />
          <span className="font-mono text-ink-muted">{outputDetails.memory} KB</span>
        </div>
      )}
    </div>
  );
};

export default OutputDetails;
