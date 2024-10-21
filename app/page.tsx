"use client";

import { ThemeProvider } from "next-themes";
import EditorPage from "./editor/page";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <EditorPage />
    </ThemeProvider>
  );
}
