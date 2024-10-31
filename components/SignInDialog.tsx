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
          className="w-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full md:rounded-md"
          variant="outline"
        >
          <SignInIcon className="w-8 h-8 md:w-6 md:h-6" />
          <p className="hidden md:block">Sign In</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-200 dark:bg-[#011727]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-8 gap-2 items-center">
            <SyntaxLabIcon width={32} height={32} />
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              SyntaxLab
            </p>
          </div>

          <div className="space-y-4 w-full">
            <Button
              onClick={() => handleOAuthSignIn("google")}
              disabled={isOAuthLoading.google}
              className="w-full inline-flex items-center gap-2 justify-center py-2 px-4 h-10 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600"
            >
              <GoogleIcon width={24} height={24} />
              Sign in with Google
            </Button>
            <Button
              onClick={() => handleOAuthSignIn("github")}
              disabled={isOAuthLoading.github}
              className="w-full inline-flex items-center gap-2 justify-center py-2 px-4 h-10 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600"
            >
              <GithubIcon className="dark:fill-white" />
              Sign in with GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
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
