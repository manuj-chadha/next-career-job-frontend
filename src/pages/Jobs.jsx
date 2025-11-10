import React, { useEffect, useRef, useCallback, useState } from 'react';
import FilterCard from '../components/FilterCard';
import Job from '../components/Job';
import JobSkeleton from '../components/skeletons/JobSkeleton';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  const { allJobs, filters, searchedQuery, jobLoading, totalEntries } = useSelector(store => store.job);

  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(0);

  // Fetch jobs using custom hook
  useGetAllJobs(page);

  const observer = useRef();

  // IntersectionObserver for infinite scrolling
  const lastJobRef = useCallback((node) => {
    if (jobLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, { rootMargin: "200px" });

    if (node) observer.current.observe(node);
  }, [jobLoading]);

  // Filter jobs after fetching
  const filterJobs = allJobs.filter(job => {
    let match = true;

    if (filters.location) {
      match = match && job.location.toLowerCase().includes(filters.location.toLowerCase());
    }
    if (filters.industry) {
      match = match && job.title.toLowerCase().includes(filters.industry.toLowerCase());
    }
    if (filters.salary) {
      const [min, max] = filters.salary === "3-6 LPA" ? [3, 6]
                        : filters.salary === "6-12 LPA" ? [6, 12]
                        : filters.salary === "12-24 LPA" ? [12, 24]
                        : [0, Infinity];
      match = match && job.salary >= min && job.salary <= max;
    }
    if (searchedQuery) {
      match = match && (
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }

    return match;
  });

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
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-1/5">
          <FilterCard />
        </div>

        {/* Mobile Popover Filter */}
        {showFilter && (
          <div className="lg:hidden absolute top-0 left-0 w-full h-fit z-50 bg-white shadow-xl rounded-lg px-5 overflow-y-auto max-h-fit">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowFilter(false)} className="text-gray-500 hover:text-black">
                <X />
              </button>
            </div>
            <FilterCard />
          </div>
        )}

        {/* Job Listings */}
        <div className="flex-1 h-[88vh] overflow-y-auto px-3 pb-5">
          {jobLoading && page === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => <JobSkeleton key={idx} />)}
            </div>
          ) : filterJobs.length === 0 ? (
            <span className="text-center text-gray-500">Sorry, no jobs found.</span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.map((job, index) => {
                const isLastJob = index === filterJobs.length - 1;
                return (
                  <motion.div
                    key={job?.id}
                    ref={isLastJob ? lastJobRef : null}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Skeleton for next pages */}
          {jobLoading && page > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, idx) => <JobSkeleton key={idx} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
