"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCompletion } from "@/hooks/useCompletion";
import { AIAction } from "@/lib/ai";
import { Language } from "@/types/language";

const QUICK_ACTIONS: { label: string; action: AIAction; message: string }[] = [
  { label: "Explain this", action: "explain", message: "Explain what this code does" },
  { label: "Fix the bug", action: "fix", message: "Find and fix any bugs" },
  { label: "Optimize", action: "optimize", message: "Suggest performance improvements" },
  { label: "Translate to...", action: "translate", message: "Translate to another language" },
];

interface AICommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: Language;
  output?: string;
  stdin?: string;
  onResponse: (text: string) => void;
}

export function AICommandBar({ isOpen, onClose, code, language, output, stdin, onResponse }: AICommandBarProps) {
  const [userMessage, setUserMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState<AIAction>("explain");
  const inputRef = useRef<HTMLInputElement>(null);

  const { complete, isLoading, completion } = useCompletion({
    api: "/api/ai",
    onFinish: (_, text) => onResponse(text),
  });

  useEffect(() => {
    if (isOpen) { setUserMessage(""); inputRef.current?.focus(); }
  }, [isOpen]);

  useEffect(() => {
    if (completion) onResponse(completion);
  }, [completion, onResponse]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (action: AIAction = selectedAction, msg: string = userMessage) => {
    if (!msg.trim()) return;
    complete("", {
      body: { action, code, language: language.value, userMessage: msg, output, stdin },
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-border-default bg-obsidian-surface shadow-2xl">
      <div className={`h-0.5 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-[length:200%_100%] ${isLoading ? "animate-pulse" : "opacity-0"}`} />
      <div className="p-3">
        <div className="flex gap-2 mb-3 flex-wrap">
          {QUICK_ACTIONS.map(({ label, action, message }) => (
            <button
              key={action}
              onClick={() => { setSelectedAction(action); handleSubmit(action, message); }}
              className="text-xs px-2.5 py-1 rounded-full border border-border-default text-ink-muted hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSubmit(); }}
            placeholder="Ask about your code..."
            className="flex-grow bg-obsidian-overlay border border-border-default rounded px-3 py-2 text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none focus:border-brand-blue"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!userMessage.trim() || isLoading}
            className="px-3 py-2 rounded bg-brand-blue text-obsidian-base text-xs font-semibold disabled:opacity-40 hover:bg-brand-blue/90 transition-colors"
          >
            {isLoading ? "..." : "Ask"}
          </button>
          <button onClick={onClose} className="text-ink-faint hover:text-ink-primary text-lg leading-none">×</button>
        </div>
        <p className="text-[10px] text-ink-faint mt-1.5">↵ to send · Esc to close · Cmd+K to reopen</p>
      </div>
    </div>
  );
}
