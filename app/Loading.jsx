// app/loading.js
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 px-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}
