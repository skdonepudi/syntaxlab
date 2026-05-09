"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Language } from "@/types/language";
import { SyntaxLabIcon, RunIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/utils/authUtils";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import ColorModeToggle from "@/components/ColorModeToggle";
import { UserMenu } from "@/components/UserMenu";
import { SignInDialog } from "@/components/SignInDialog";
import { SaveSnippetPopover } from "@/components/SaveSnippetPopover";
import { Snippet } from "@/lib/snippets";

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
  onSignInRequired: () => void;
}

export function Topbar({
  language, theme, code, isProcessing,
  onLanguageChange, onThemeChange, handleCompileClick,
  currentSnippet, saveTriggered, onSnippetSaved, onSnippetsClick, onSignInRequired,
}: TopbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => { setUser(u); setIsLoading(false); });
  }, []);

  return (
    <header className="flex items-center justify-between h-11 px-3 bg-obsidian-surface border-b border-border-default shrink-0">
      {/* Left: logo + controls */}
      <div className="flex items-center gap-3">
        <Link href="/landing" className="flex items-center gap-1.5 text-ink-primary hover:text-brand-blue transition-colors">
          <SyntaxLabIcon className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:block">SyntaxLab</span>
        </Link>
        <div className="h-4 w-px bg-border-default" />
        <LanguagesDropdown language={language} onSelectChange={onLanguageChange} />
        <ThemeDropdown theme={theme} onThemeChange={onThemeChange} />
      </div>

      {/* Right: actions + user */}
      <div className="flex items-center gap-2">
        {user && (
          <>
            <SaveSnippetPopover
              code={code}
              language={language}
              currentSnippet={currentSnippet}
              onSaved={onSnippetSaved}
              onSignInRequired={onSignInRequired}
              saveTriggered={saveTriggered}
            />
            <Button variant="ghost" size="sm" onClick={onSnippetsClick}>
              Snippets
            </Button>
          </>
        )}
        <Button
          variant="run"
          size="sm"
          onClick={handleCompileClick}
          disabled={isProcessing || !code}
          className="gap-1.5"
        >
          <RunIcon width={13} height={13} />
          <span className="hidden sm:inline">{isProcessing ? "Running..." : "Run"}</span>
        </Button>
        <ColorModeToggle />
        {isLoading
          ? <div className="h-7 w-7 rounded-full bg-obsidian-overlay animate-pulse" />
          : user
          ? <UserMenu user={user} setUser={setUser} />
          : <SignInDialog />}
      </div>
    </header>
  );
}
