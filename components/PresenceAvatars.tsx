"use client";
import { useOthers, useSelf } from "@/lib/liveblocks";

export function PresenceAvatars() {
  const others = useOthers();
  const self = useSelf();
  const all = [self, ...others].filter(Boolean).slice(0, 5);
  const overflow = others.length - 4;

  return (
    <div className="flex items-center -space-x-2">
      {all.map((user, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full border-2 border-obsidian-base flex items-center justify-center text-[10px] font-bold text-obsidian-base"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ background: (user as any)?.info?.color ?? "#58a6ff", zIndex: all.length - i }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title={(user as any)?.info?.name ?? "Guest"}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {((user as any)?.info?.name ?? "G")[0].toUpperCase()}
        </div>
      ))}
      {overflow > 0 && (
        <div className="w-6 h-6 rounded-full border-2 border-obsidian-base bg-obsidian-overlay flex items-center justify-center text-[10px] text-ink-muted">
          +{overflow}
        </div>
      )}
    </div>
  );
}
