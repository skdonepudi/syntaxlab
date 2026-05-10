import React from "react";
import { FileCode2, Globe, Share2 } from "lucide-react";

interface Stat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

const ICONS: Record<string, React.ElementType> = { FileCode2, Globe, Share2 };

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex gap-4">
      {stats.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <div
            key={s.label}
            className="flex items-center gap-4 flex-1 rounded-xl border border-border-default bg-obsidian-surface px-5 py-4"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: `${s.color}18`,
                border: `1px solid ${s.color}30`,
              }}
            >
              {Icon && <Icon size={18} color={s.color} />}
            </div>
            <div>
              <p className="text-2xl font-bold text-ink-primary">{s.value}</p>
              <p className="text-xs text-ink-muted mt-0.5">{s.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
