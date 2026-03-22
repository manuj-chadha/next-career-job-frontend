import { Skeleton } from "../ui/skeleton";

const HomeSkeleton = () => {
  return (
    <div className="px-6 space-y-10">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-3">
          {/* Logo */}
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />

          {/* Nav Links (desktop only) */}
          <div className="hidden md:flex gap-6">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Avatar / Auth */}
          <div className="flex items-center gap-4">
            {/* Desktop buttons OR avatar */}
            <div className="hidden md:block h-10 w-24 bg-gray-200 rounded animate-pulse" />

            {/* Avatar circle */}
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
      {/* HERO */}
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-1/2" />

        {/* Search */}
        <Skeleton className="h-12 w-full max-w-xl rounded-full" />
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-4 justify-center flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-36 rounded-full" />
        ))}
      </div>

      {/* JOB SECTION */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-64" />

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-5 border rounded-xl space-y-3">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
