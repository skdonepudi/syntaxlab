"use client";

import { ThemeProvider } from "next-themes";
import EditorPage from "@/app/editor/page";
import "@/styles/global.css";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <EditorPage />
    </ThemeProvider>
  );
}
