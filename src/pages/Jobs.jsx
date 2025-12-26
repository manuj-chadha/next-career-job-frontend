import React, { useEffect, useRef, useCallback, useState } from 'react';
import FilterCard from '../components/FilterCard';
import Job from '../components/Job';
import JobSkeleton from '../components/skeletons/JobSkeleton';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { X, Filter, Search } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from '@/components/ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
  const { allJobs, filters, searchedQuery, jobLoading } = useSelector(store => store.job);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [query, setQuery]=useState("");

  useGetAllJobs(page);

  const searchJobHandler = () => {
          if (!query.trim()) return;
          dispatch(setSearchedQuery(query));
      };

  const observer = useRef();
  const scrollContainerRef = useRef(null);

  const lastJobRef = useCallback(
    (node) => {
      if (jobLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !jobLoading) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: '200px',
        }
      );

      if (node) observer.current.observe(node);
    },
    [jobLoading]
  );

  // Filtering logic
  const filterJobs = allJobs.filter((job) => {
    let match = true;

    if (filters.location)
      match = match && job.location.toLowerCase().includes(filters.location.toLowerCase());
    if (filters.industry)
      match = match && job.title.toLowerCase().includes(filters.industry.toLowerCase());
    if (filters.salary) {
      const [min, max] =
        filters.salary === '3-6 LPA'
          ? [3, 6]
          : filters.salary === '6-12 LPA'
            ? [6, 12]
            : filters.salary === '12-24 LPA'
              ? [12, 24]
              : [0, Infinity];
      match = match && job.salary >= min && job.salary <= max;
    }
    if (searchedQuery)
      match =
        match &&
        (job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()));

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
        {/* Fixed Sidebar for Desktop */}
        <div className="hidden lg:block lg:w-1/5 sticky top-5 self-start h-fit">
          <FilterCard />
        </div>

        {/* Mobile Filter Overlay */}
        {showFilter && (
          <div className="lg:hidden absolute top-0 left-0 w-full h-fit z-50 bg-white shadow-xl rounded-lg px-5 max-h-fit">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowFilter(false)} className="text-gray-500 hover:text-black">
                <X />
              </button>
            </div>
            <FilterCard />
          </div>
        )}

        {/* Scrollable Job Listing */}
        <div
          ref={scrollContainerRef}
          className="flex-1 h-[88vh] overflow-y-auto px-3 pb-5"
        >
          <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 mb-4 text-sm rounded-full items-center gap-4 mx-auto overflow-hidden max-sm:w-[80%]'>
            <input
              type="text"
              placeholder='Find your dream jobs'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
              className='outline-none border-none w-full py-2 bg-transparent text-gray-700'
            />
            <Button
              onClick={()=> searchJobHandler()}
              className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6]"
              aria-label="Search"
            >
              <Search className='h-5 w-5' />
            </Button>
          </div>
          {jobLoading && page === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <JobSkeleton key={idx} />
              ))}
            </div>
          ) : filterJobs.length === 0 ? (
            <span className="text-center text-gray-500 block mt-10">
              Sorry, no jobs found.
            </span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.map((job, index) => {
                const isLastJob = index === filterJobs.length - 1;
                return (
                  <div ref={isLastJob ? lastJobRef : null} key={job._id || job.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Skeleton for next pages */}
          {jobLoading && page > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <JobSkeleton key={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
