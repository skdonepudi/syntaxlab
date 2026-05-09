"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createSnippet, updateSnippet, Snippet } from "@/lib/snippets";
import { Language } from "@/types/language";
import { getCurrentUser } from "@/utils/authUtils";
import { toast } from "react-toastify";

interface SaveSnippetPopoverProps {
  code: string;
  language: Language;
  currentSnippet: Snippet | null;
  onSaved: (snippet: Snippet) => void;
  onSignInRequired: () => void;
  saveTriggered: number;
}

export function SaveSnippetPopover({ code, language, currentSnippet, onSaved, onSignInRequired, saveTriggered }: SaveSnippetPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(currentSnippet?.title ?? "Untitled");
  const [isPublic, setIsPublic] = useState(currentSnippet?.is_public ?? true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const user = await getCurrentUser();
    if (!user) { onSignInRequired(); return; }
    setIsSaving(true);
    try {
      if (currentSnippet) {
        await updateSnippet(currentSnippet.id, { title, code, is_public: isPublic });
        onSaved({ ...currentSnippet, title, code, is_public: isPublic });
        toast.success("Snippet saved");
      } else {
        const snippet = await createSnippet({
          userId: user.id, title, languageId: language.id, code, isPublic: isPublic,
        });
        if (snippet) { onSaved(snippet); toast.success("Snippet saved"); }
      }
      setIsOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClick = async () => {
    if (currentSnippet) {
      const user = await getCurrentUser();
      if (!user) { onSignInRequired(); return; }
      setIsSaving(true);
      await updateSnippet(currentSnippet.id, { code });
      toast.success("Saved", { autoClose: 1500 });
      setIsSaving(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (saveTriggered > 0) handleClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveTriggered]);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleClick} disabled={isSaving} title="Save (Cmd+S)">
        {isSaving ? "Saving..." : "Save"}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
          <div className="relative bg-obsidian-surface border border-border-default rounded-lg p-5 w-80 shadow-xl">
            <h3 className="text-sm font-semibold text-ink-primary mb-4">Save Snippet</h3>
            <label className="block text-xs text-ink-muted mb-1">Title</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-obsidian-overlay border border-border-default rounded px-3 py-1.5 text-sm text-ink-primary focus:outline-none focus:border-brand-blue mb-4"
              placeholder="Untitled"
            />
            <label className="flex items-center gap-2 text-xs text-ink-muted mb-4 cursor-pointer">
              <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded" />
              Public (shareable link)
            </label>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={isSaving || !title.trim()}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
