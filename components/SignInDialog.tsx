"use client";

import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { signInWithOAuth } from "@/utils/authActions";
import {
  GoogleIcon,
  SyntaxLabIcon,
  GithubIcon,
  SignInIcon,
} from "@/components/icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SignInDialogProps {
  redirectPath?: string;
}

export function SignInDialog({ redirectPath = "/editor" }: SignInDialogProps) {
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
    } catch (error) {
      console.error("OAuth error:", error);
    } finally {
      setIsOAuthLoading((prev) => ({ ...prev, [provider]: false }));
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2"
          variant="ghost"
        >
          <SignInIcon className="w-8 h-8 md:w-6 md:h-6" />
          <p className="hidden md:block">Sign In</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-8 gap-2 items-center">
            <SyntaxLabIcon width={32} height={32} />
            <p className="text-xl font-bold text-ink-primary">
              SyntaxLab
            </p>
          </div>

          <div className="space-y-4 w-full">
            <Button
              onClick={() => handleOAuthSignIn("google")}
              disabled={isOAuthLoading.google}
              className="w-full flex items-center gap-3 justify-center px-4 py-2 rounded border border-border-default bg-obsidian-overlay text-ink-primary text-sm hover:bg-obsidian-surface transition-colors"
            >
              <GoogleIcon width={24} height={24} />
              Sign in with Google
            </Button>
            <Button
              onClick={() => handleOAuthSignIn("github")}
              disabled={isOAuthLoading.github}
              className="w-full flex items-center gap-3 justify-center px-4 py-2 rounded border border-border-default bg-obsidian-overlay text-ink-primary text-sm hover:bg-obsidian-surface transition-colors"
            >
              <GithubIcon />
              Sign in with GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-ink-faint">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-brand-blue hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-brand-blue hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
