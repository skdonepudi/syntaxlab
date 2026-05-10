"use client";

import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { signInWithOAuth } from "@/utils/authActions";
import {
  GoogleIcon,
  GithubIcon,
  SignInIcon,
} from "@/components/icons";
import { Code2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SignInDialogProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export function SignInDialog({ redirectPath = "/editor", children }: SignInDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<{
    google: boolean;
    github: boolean;
  }>({ google: false, github: false });

  async function handleOAuthSignIn(provider: Provider) {
    setIsOAuthLoading((prev) => ({ ...prev, [provider]: true }));
    try {
      const url = await signInWithOAuth(provider, redirectPath);
      if (url) {
        window.location.href = url;
      }
    } catch {
      // OAuth redirect failed — dialog stays open so user can retry
    } finally {
      setIsOAuthLoading((prev) => ({ ...prev, [provider]: false }));
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button className="gap-2" variant="ghost">
            <SignInIcon className="w-8 h-8 md:w-6 md:h-6" />
            <p className="hidden md:block">Sign In</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden gap-0 max-w-[420px] w-full">
        {/* Gradient header band */}
        <div
          className="relative overflow-hidden"
          style={{ padding: "32px 32px 28px", background: "linear-gradient(135deg, #161b22 0%, #0d1117 100%)" }}
        >
          {/* Subtle glow overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(ellipse at top center, #58a6ff18, transparent 65%)" }}
          />

          {/* Content — centred */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo row */}
            <div className="flex items-center gap-2.5">
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "linear-gradient(135deg, #58a6ff, #7c3aed)",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 14px #58a6ff35",
                }}
              >
                <Code2 size={18} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-ink-primary">SyntaxLab</span>
            </div>

            {/* Tagline */}
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Code in any language, collaborate in real time.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

        {/* Buttons section */}
        <div style={{ padding: "28px 32px" }}>
          <p className="text-xs font-medium text-ink-faint mb-4 uppercase tracking-wider text-center">
            Continue with
          </p>

          {/* Google button */}
          <button
            onClick={() => handleOAuthSignIn("google")}
            disabled={isOAuthLoading.google}
            className="w-full flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-border-default bg-obsidian-overlay text-ink-primary text-sm font-medium hover:bg-obsidian-base hover:border-border-default transition-colors disabled:opacity-50 mb-3"
          >
            {isOAuthLoading.google ? (
              <span className="animate-spin w-4 h-4 rounded-full border-2 border-ink-faint border-t-ink-primary" />
            ) : (
              <GoogleIcon width={20} height={20} />
            )}
            Sign in with Google
          </button>

          {/* GitHub button */}
          <button
            onClick={() => handleOAuthSignIn("github")}
            disabled={isOAuthLoading.github}
            className="w-full flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-border-default bg-obsidian-overlay text-ink-primary text-sm font-medium hover:bg-obsidian-base hover:border-border-default transition-colors disabled:opacity-50"
          >
            {isOAuthLoading.github ? (
              <span className="animate-spin w-4 h-4 rounded-full border-2 border-ink-faint border-t-ink-primary" />
            ) : (
              <span className="w-5 h-5 flex items-center justify-center">
                <GithubIcon className="w-5 h-5" />
              </span>
            )}
            Sign in with GitHub
          </button>

          {/* Privacy note */}
          <p className="mt-4 text-center text-[11px] text-ink-faint leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="text-brand-blue/80 hover:text-brand-blue">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-brand-blue/80 hover:text-brand-blue">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
