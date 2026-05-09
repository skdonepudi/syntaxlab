"use client";
import React from "react";
import Image from "next/image";
import { Language } from "@/types/language";
import { CompressIcon, ExpandIcon } from "@/components/icons";

interface TabBarProps {
  language: Language;
  fileName: string;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

export function TabBar({ language, fileName, isFullScreen, onToggleFullScreen }: TabBarProps) {
  return (
    <div className="flex items-center justify-between bg-obsidian-base border-b border-border-default h-9 px-2 shrink-0">
      <div className="flex items-center">
        {/* Active tab */}
        <div className="flex items-center gap-1.5 px-3 h-9 border-t-2 border-t-brand-blue bg-obsidian-base text-ink-primary">
          <Image src={language.icon} alt="" width={13} height={13} className="opacity-80" />
          <span className="text-xs">{fileName}</span>
        </div>
      </div>
      <button
        onClick={onToggleFullScreen}
        className="p-1 rounded text-ink-faint hover:text-ink-primary hover:bg-obsidian-overlay transition-colors"
        title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
      >
        {isFullScreen ? <CompressIcon className="w-3.5 h-3.5" /> : <ExpandIcon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
