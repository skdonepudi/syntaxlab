//sample error page
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
        Error
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        Something went wrong
      </p>
    </div>
  );
}
