import Link from "next/link";
import { SyntaxLabIcon } from "@/components/icons";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(206,81.9%,65.3%,0.5),rgba(255,255,255,0))] text-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero"
            width="80"
            height="80"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#hero)"
        ></rect>
      </svg>
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <SyntaxLabIcon width={32} height={32} />
          <div className="text-2xl font-bold">Syntax Lab</div>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href={"/editor"}
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10 ">
              <span className="ml-2">Try it now</span>
              <svg
                fill="none"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </Link>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto text-center mt-32 px-4">
        <h1 className="text-6xl font-bold mb-8 animate-gradient bg-gradient-to-r from-[#fff] via-[#fff]/80 to-[#9089fc] bg-300% bg-clip-text text-transparent leading-tight">
          Code, Collaborate,
          <br />
          Create Together
        </h1>
        <p className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience the next generation of web-based coding. With support for
          40+ programming languages, real-time collaboration, customizable
          themes, and instant compilation. Code smarter, share easier, build
          faster.
        </p>
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/editor"
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6 text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-8 ring-1 ring-white/10">
              <span className="ml-2">Start Coding</span>
              <svg
                fill="none"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </Link>
        </div>
      </main>

      <footer className="mt-auto w-full py-6 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-400">
            © 2024 Syntax Lab. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
