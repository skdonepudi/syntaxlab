"use client";
import { Terminal } from "lucide-react";

const CustomInput = ({
  customInput,
  setCustomInput,
}: {
  customInput: string;
  setCustomInput: (value: string) => void;
  position?: "top" | "bottom";
}) => {
  return (
    <div className="flex flex-col border-t border-border-default">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian-surface border-b border-border-default shrink-0">
        <Terminal size={11} className="text-ink-faint" />
        <span className="text-[10px] text-ink-faint uppercase tracking-widest font-mono">stdin</span>
      </div>
      <textarea
        rows={6}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Provide input for your program..."
        className="w-full flex-1 resize-none bg-obsidian-base text-ink-primary text-xs font-mono p-3 placeholder:text-ink-faint/50 focus:outline-none border-none leading-relaxed"
      />
    </div>
  );
};

export default CustomInput;
