import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import FilterCard from '../components/FilterCard';
import Job from '../components/Job';
import JobSkeleton from '../components/skeletons/JobSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';

const PAGE_SIZE = 12;

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, filters, searchedQuery, jobLoading, totalJobs } =
    useSelector(store => store.job);

  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  useGetAllJobs(page);

  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  const hasMore = allJobs.length < totalJobs;

  /**
   * Stable observer callback
   */
  const lastJobRef = useCallback(
    node => {
      if (jobLoading || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !jobLoading && hasMore) {
            setPage(prev => prev + 1);
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: '200px',
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [jobLoading, hasMore]
  );

  /**
   * Cleanup observer on unmount
   */
  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  /**
   * Filtered jobs (view-only concern)
   */
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      let match = true;

      if (filters.location)
        match &&= job.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      if (filters.industry)
        match &&= job.title
          .toLowerCase()
          .includes(filters.industry.toLowerCase());

      if (filters.salary) {
        const [min, max] =
          filters.salary === '3-6 LPA'
            ? [3, 6]
            : filters.salary === '6-12 LPA'
            ? [6, 12]
            : filters.salary === '12-24 LPA'
            ? [12, 24]
            : [0, Infinity];

        match &&= job.salary >= min && job.salary <= max;
      }

      if (searchedQuery) {
        const q = searchedQuery.toLowerCase();
        match &&=
          job.title.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q);
      }

      return match;
    });
  }, [allJobs, filters, searchedQuery]);

  return (
    <div className="max-w-8xl mx-auto mt-5 sm:px-6 md:px-8 relative">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4 ml-2">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm"
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 relative">
        {/* Desktop Filter */}
        <div className="hidden lg:block lg:w-1/5 sticky top-5 self-start h-fit">
          <FilterCard />
        </div>

        {/* Mobile Filter Overlay */}
        {showFilter && (
          <div className="lg:hidden absolute top-0 left-0 w-full z-50 bg-white shadow-xl rounded-lg px-5">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowFilter(false)}>
                <X />
              </button>
            </div>
            <FilterCard />
          </div>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 h-[88vh] overflow-y-auto px-3 pb-5"
        >
          {jobLoading && page === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <span className="text-center text-gray-500 block mt-10">
              Sorry, no jobs found.
            </span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job, index) => {
                const isLastRawJob =
                  index === allJobs.length - 1 && hasMore;

                return (
                  <div
                    key={job._id || job.id}
                    ref={isLastRawJob ? lastJobRef : null}
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

          {/* Loader for next pages */}
          {jobLoading && page > 0 && (
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
