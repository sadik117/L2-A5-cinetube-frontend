import { Film } from "lucide-react";

// Not Found Component
export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Film className="w-24 h-24 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Media Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400">The requested media could not be found.</p>
      </div>
    </div>
  );
}