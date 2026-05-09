"use client";
import React from "react";

type Tab = "output" | "ai";

interface OutputTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  hasAIResponse: boolean;
  children: React.ReactNode;
}

export function OutputTabs({ activeTab, onTabChange, hasAIResponse, children }: OutputTabsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center border-b border-border-default bg-obsidian-surface shrink-0">
        {(["output", "ai"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-xs font-medium capitalize transition-colors relative ${
              activeTab === tab
                ? "text-ink-primary"
                : "text-ink-faint hover:text-ink-muted"
            }`}
          >
            {tab}
            {tab === "ai" && hasAIResponse && activeTab !== "ai" && (
              <span className="absolute top-1.5 right-1 w-1.5 h-1.5 rounded-full bg-brand-purple" />
            )}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
            )}
          </button>
        ))}
      </div>
      <div className="flex-grow overflow-hidden">{children}</div>
    </div>
  );
}
