export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-transparent bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(206,81.9%,65.3%,0.5),rgba(255,255,255,0))] dark:text-white text-gray-900">
      {/* Background pattern SVG */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-black/10 dark:stroke-white/5 [mask-image:radial-gradient(75%_50%_at_bottom_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="404-grid"
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
          strokeWidth="0"
          fill="url(#404-grid)"
        ></rect>
      </svg>
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-black/10 dark:stroke-white/5 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="404-grid"
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
          strokeWidth="0"
          fill="url(#404-grid)"
        ></rect>
      </svg>

      <div className="text-center space-y-8 p-8 relative z-10">
        {/* 404 heading with gradient */}
        <h1 className="text-9xl font-extrabold animate-gradient bg-gradient-to-r from-gray-900 via-gray-800 to-[#9089fc] dark:from-[#fff] dark:via-[#fff]/80 dark:to-[#9089fc] bg-300% bg-clip-text text-transparent">
          404
        </h1>

        {/* Error message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Oops! Page not found
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to another URL.
        </p>

        {/* Return home button matching landing page style */}
        <a
          href="/"
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6 text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-8 ring-1 ring-white/10">
            <span className="ml-2">Return Home</span>
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
        </a>
      </div>
    </div>
  );
}
