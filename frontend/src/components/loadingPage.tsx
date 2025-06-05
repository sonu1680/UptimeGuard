const SkeletonHeader = () => (
  <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24 sm:w-32"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16 sm:w-20"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </header>
);

const SkeletonSidebar = () => (
  <aside className="hidden sm:block w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-900 ">
    <div className="p-4">
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1"></div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  </aside>
);

export default function LoadingPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <SkeletonHeader />

      <div className="flex flex-col sm:flex-row">
        <SkeletonSidebar />

        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48 sm:w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-60 sm:w-96"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16 sm:w-20 mb-2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12 sm:w-16"></div>
                  </div>
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-40 sm:w-48"></div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
                  >
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16 self-end sm:self-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
