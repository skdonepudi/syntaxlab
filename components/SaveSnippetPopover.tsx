"use client";
import React, { useState, useEffect } from "react";
import { createSnippet, updateSnippet, Snippet } from "@/lib/snippets";
import { Language } from "@/types/language";
import { getCurrentUser } from "@/utils/authUtils";
import { toast } from "react-toastify";
import { Save, Globe, Lock } from "lucide-react";

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
        else throw new Error("Failed to create snippet");
      }
      setIsOpen(false);
    } catch {
      toast.error("Failed to save snippet. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClick = async () => {
    if (currentSnippet) {
      const user = await getCurrentUser();
      if (!user) { onSignInRequired(); return; }
      setIsSaving(true);
      try {
        await updateSnippet(currentSnippet.id, { code });
        toast.success("Saved", { autoClose: 1500 });
      } catch {
        toast.error("Failed to save. Please try again.");
      } finally {
        setIsSaving(false);
      }
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
      <button
        onClick={handleClick}
        disabled={isSaving}
        title="Save (Cmd+S)"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:text-ink-primary hover:bg-obsidian-overlay transition-colors disabled:opacity-50"
      >
        {isSaving
          ? <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-faint border-t-ink-primary animate-spin" />
          : <Save size={14} />}
        <span className="hidden sm:inline">{isSaving ? "Saving…" : "Save"}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-obsidian-surface border border-border-default rounded-xl w-[340px] shadow-2xl overflow-hidden">
            {/* Header band */}
            <div className="px-5 pt-5 pb-4 border-b border-border-default">
              <div className="flex items-center gap-2.5 mb-0.5">
                <div className="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center">
                  <Save size={14} className="text-brand-blue" />
                </div>
                <h3 className="text-sm font-semibold text-ink-primary">Save Snippet</h3>
              </div>
              <p className="text-xs text-ink-faint mt-1 ml-9">Name and set visibility for your snippet</p>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5">Title</label>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-obsidian-overlay border border-border-default rounded-lg px-3 py-2 text-sm text-ink-primary focus:outline-none focus:border-brand-blue transition-colors placeholder:text-ink-faint"
                  placeholder="Untitled snippet"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5">Visibility</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPublic(true)}
                    className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg border text-xs font-medium transition-colors ${
                      isPublic
                        ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                        : "border-border-default bg-obsidian-overlay text-ink-muted hover:text-ink-primary hover:border-border-default"
                    }`}
                  >
                    <Globe size={13} />
                    Public
                  </button>
                  <button
                    onClick={() => setIsPublic(false)}
                    className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg border text-xs font-medium transition-colors ${
                      !isPublic
                        ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                        : "border-border-default bg-obsidian-overlay text-ink-muted hover:text-ink-primary hover:border-border-default"
                    }`}
                  >
                    <Lock size={13} />
                    Private
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-sm text-ink-muted hover:text-ink-primary hover:bg-obsidian-overlay transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !title.trim()}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-brand-blue text-obsidian-base hover:bg-[#79c0ff] transition-colors disabled:opacity-50"
              >
                {isSaving
                  ? <span className="w-3.5 h-3.5 rounded-full border-2 border-obsidian-base/40 border-t-obsidian-base animate-spin" />
                  : <Save size={13} />}
                {isSaving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
