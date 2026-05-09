interface Stat { label: string; value: number | string; }

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex gap-4">
      {stats.map((s) => (
        <div key={s.label} className="flex-1 rounded-lg border border-border-default bg-obsidian-surface px-4 py-3">
          <p className="text-2xl font-bold text-ink-primary">{s.value}</p>
          <p className="text-xs text-ink-muted mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
