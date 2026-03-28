import React, { useEffect, useRef, useCallback, useState } from 'react';
import FilterCard from '../components/FilterCard';
import Job from '../components/Job';
import JobSkeleton from '../components/skeletons/JobSkeleton';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { fetchJobs } from '@/utils/fetchJobs';
import { useInfiniteQuery } from '@tanstack/react-query';

const Jobs = () => {
  const { filters, searchedQuery } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);

  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'jobs',
      'jobsPage',
      searchedQuery,
      filters.location,
      filters.industry,
      filters.salary,
    ],
    queryFn: ({ pageParam }) =>
      fetchJobs({
        pageParam,
        keyword: searchedQuery || '',
        location: filters.location || '',
        industry: filters.industry || '',
        salaryBand: filters.salary || '',
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.totalPages) return undefined;
      return allPages.length < lastPage.totalPages ? allPages.length : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  const allJobs = data?.pages?.flatMap((page) => page.jobs) ?? [];

  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  const lastJobRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: '200px',
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  if (error) {
    return (
      <div className="max-w-8xl mx-auto mt-5 px-6 text-center text-red-600">
        {error.message || 'Could not load jobs.'}
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto mt-5 sm:px-6 md:px-8 relative">
      <div className="lg:hidden mb-4 ml-2">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm"
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 relative">
        <div className="hidden lg:block lg:w-1/5 sticky top-5 self-start h-fit">
          <FilterCard />
        </div>

        {showFilter && (
          <div className="lg:hidden absolute top-0 left-0 w-full z-50 bg-white shadow-xl rounded-lg px-5">
            <div className="flex justify-end mb-4">
              <button type="button" onClick={() => setShowFilter(false)}>
                <X />
              </button>
            </div>
            <FilterCard />
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className="flex-1 h-[88vh] overflow-y-auto px-3 pb-5"
        >
          {isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          ) : allJobs.length === 0 ? (
            <span className="text-center text-gray-500 block mt-10">
              Sorry, no jobs found.
            </span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allJobs.map((job, index) => {
                const isLastJob = index === allJobs.length - 1;
                return (
                  <div
                    key={job._id || job.id}
                    ref={isLastJob ? lastJobRef : null}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}

          {isFetchingNextPage && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
