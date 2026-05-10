"use client";
import React from "react";
import { SquareTerminal, Sparkles } from "lucide-react";

type Tab = "output" | "ai";

interface OutputTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  hasAIResponse: boolean;
  children: React.ReactNode;
}

const TAB_META: Record<Tab, { label: string; Icon: React.ElementType }> = {
  output: { label: "Output", Icon: SquareTerminal },
  ai: { label: "AI", Icon: Sparkles },
};

export function OutputTabs({ activeTab, onTabChange, hasAIResponse, children }: OutputTabsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center border-b border-border-default bg-obsidian-surface shrink-0">
        {(["output", "ai"] as Tab[]).map((tab) => {
          const { label, Icon } = TAB_META[tab];
          const isActive = activeTab === tab;
          const isAI = tab === "ai";
          return (
            <button
              key={tab}
              onClick={() => !isAI && onTabChange(tab)}
              disabled={isAI}
              className={`relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors ${
                isAI
                  ? "text-ink-faint/50 cursor-not-allowed"
                  : isActive
                  ? "text-ink-primary"
                  : "text-ink-faint hover:text-ink-muted"
              }`}
            >
              <Icon size={12} strokeWidth={1.75} />
              {label}
              {isAI && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide bg-brand-purple/15 text-brand-purple/70 border border-brand-purple/20">
                  SOON
                </span>
              )}
              {isActive && !isAI && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
      <div className="flex-grow overflow-hidden">{children}</div>
    </div>
  );
}
