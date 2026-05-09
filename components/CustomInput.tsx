import { ExpandBottom } from "./icons";

const CustomInput = ({
  customInput,
  setCustomInput,
}: {
  customInput: string;
  setCustomInput: (value: string) => void;
  position: "top" | "bottom";
}) => {
  return (
    <div className="flex flex-col border-t border-border-default">
      <div className="flex items-center justify-between px-3 py-1.5 bg-obsidian-surface border-b border-border-default shrink-0">
        <span className="text-xs text-ink-muted uppercase tracking-wider font-mono">
          Custom Input
        </span>
        <button className="p-1 hover:bg-obsidian-overlay rounded text-ink-faint hover:text-ink-primary transition-colors">
          <ExpandBottom className="w-4 h-4" />
        </button>
      </div>
      <textarea
        rows={8}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        className="w-full flex-1 resize-none bg-obsidian-base text-ink-primary text-xs font-mono p-3 placeholder:text-ink-faint focus:outline-none border-none"
      ></textarea>
    </div>
  );
};

export default CustomInput;
