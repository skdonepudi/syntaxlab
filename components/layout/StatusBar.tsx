"use client";
import React from "react";
import { Language } from "@/types/language";

interface StatusBarProps {
  language: Language;
  cursorPosition: { line: number; column: number };
  judgeStatus?: string;
}

export function StatusBar({ language, cursorPosition, judgeStatus }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between h-6 px-3 bg-obsidian-surface border-t border-border-default text-[11px] text-ink-faint shrink-0">
      <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
      <div className="flex items-center gap-3">
        {judgeStatus && <span className="text-brand-blue">{judgeStatus}</span>}
        <span>{language.label.split(" ")[0]}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
