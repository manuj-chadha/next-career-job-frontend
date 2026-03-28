import React, { useEffect, useRef, useCallback } from "react";
import Job from "../components/Job";
import JobSkeleton from "../components/skeletons/JobSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { fetchJobs } from "@/utils/fetchJobs";
import { useInfiniteQuery } from "@tanstack/react-query";

const Browse = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["jobs", "browse", searchedQuery],
    queryFn: ({ pageParam }) =>
      fetchJobs({ pageParam, keyword: searchedQuery || "" }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.totalPages) return undefined;
      return allPages.length < lastPage.totalPages ? allPages.length : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });

  const totalElements = data?.pages?.[0]?.totalElements ?? 0;
  const allJobs = data?.pages?.flatMap((page) => page.jobs) ?? [];

  const observer = useRef(null);
  const lastJobRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        },
        { rootMargin: "200px" },
      );

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    return () => dispatch(setSearchedQuery(""));
  }, [dispatch]);

  if (error) {
    return (
      <div className="relative p-8 text-center text-red-600">
        {error.message || "Could not load jobs."}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid-background"></div>
      <div className="max-w-7xl mx-auto py-2 pb-10 px-4 sm:px-6 md:px-8">
        <h1 className="font-bold text-lg sm:text-xl my-5">
          Search Results ({totalElements})
        </h1>

        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allJobs.map((job, index) => {
                const isLastJob = index === allJobs.length - 1;
                return (
                  <Job
                    key={job._id || job.id}
                    job={job}
                    ref={isLastJob ? lastJobRef : null}
                  />
                );
              })}
            </div>

            {isFetchingNextPage && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <JobSkeleton key={idx} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
