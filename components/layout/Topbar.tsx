"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Language } from "@/types/language";
import { RunIcon } from "@/components/icons";
import { Code2, BookOpen, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/utils/authUtils";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import { UserMenu } from "@/components/UserMenu";
import { SignInDialog } from "@/components/SignInDialog";
import { SaveSnippetPopover } from "@/components/SaveSnippetPopover";
import { Snippet } from "@/lib/snippets";
import { CollaborateButton } from "@/components/CollaborateButton";
import { PresenceAvatars } from "@/components/PresenceAvatars";

interface TopbarProps {
  language: Language;
  theme: string;
  code: string;
  isProcessing: boolean;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: string) => void;
  handleCompileClick: () => void;
  currentSnippet: Snippet | null;
  saveTriggered: number;
  onSnippetSaved: (s: Snippet) => void;
  onSnippetsClick: () => void;
  onNewSnippet: () => void;
  onSignInRequired: () => void;
  roomId?: string | null;
}

export function Topbar({
  language, theme, code, isProcessing,
  onLanguageChange, onThemeChange, handleCompileClick,
  currentSnippet, saveTriggered, onSnippetSaved, onSnippetsClick, onNewSnippet, onSignInRequired,
  roomId,
}: TopbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => { setUser(u); setIsLoading(false); });
  }, []);

  const sep = <div className="h-4 w-px bg-border-default shrink-0" />;

  return (
    <header className="flex items-center justify-between h-12 px-4 bg-obsidian-surface border-b border-border-default shrink-0">
      {/* Left: logo · language · theme */}
      <div className="flex items-center gap-3">
        <Link href="/landing" className="flex items-center gap-2 text-ink-primary hover:text-brand-blue transition-colors shrink-0">
          <div style={{ width: 26, height: 26, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px #58a6ff25" }}>
            <Code2 size={14} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold hidden sm:block tracking-tight">SyntaxLab</span>
        </Link>
        {sep}
        <LanguagesDropdown language={language} onSelectChange={onLanguageChange} />
        <ThemeDropdown theme={theme} onThemeChange={onThemeChange} />
      </div>

      {/* Right: collab · save/snippets · run · auth */}
      <div className="flex items-center gap-1.5">
        {!!roomId && <PresenceAvatars />}
        <CollaborateButton roomId={roomId ?? null} />

        {user && (
          <>
            {sep}
            <SaveSnippetPopover
              code={code}
              language={language}
              currentSnippet={currentSnippet}
              onSaved={onSnippetSaved}
              onSignInRequired={onSignInRequired}
              saveTriggered={saveTriggered}
            />
            {currentSnippet && (
              <button
                onClick={onNewSnippet}
                title="New snippet"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:text-ink-primary hover:bg-obsidian-overlay transition-colors"
              >
                <FilePlus size={14} />
                <span className="hidden sm:inline">New</span>
              </button>
            )}
            <button
              onClick={onSnippetsClick}
              title="My snippets"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:text-ink-primary hover:bg-obsidian-overlay transition-colors"
            >
              <BookOpen size={14} />
              <span className="hidden sm:inline">Snippets</span>
            </button>
          </>
        )}

        {sep}
        <Button
          variant="run"
          size="sm"
          onClick={handleCompileClick}
          disabled={isProcessing || !code}
          className="gap-1.5 px-3"
        >
          <RunIcon width={13} height={13} />
          <span className="hidden sm:inline">{isProcessing ? "Running…" : "Run"}</span>
        </Button>
        {sep}
{isLoading
          ? <div className="h-7 w-7 rounded-full bg-obsidian-overlay animate-pulse" />
          : user
          ? <UserMenu user={user} setUser={setUser} />
          : <SignInDialog />}
      </div>
    </header>
  );
}
