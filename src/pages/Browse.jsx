import React, { useEffect, useRef, useCallback, useState } from 'react';
import Job from '../components/Job';
import JobSkeleton from '../components/skeletons/JobSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs, jobLoading, searchedQuery, totalJobs } = useSelector(store => store.job);
  const [page, setPage] = useState(0);

  // Fetch jobs when page changes
  useGetAllJobs(page);

  // Observer setup
  const observer = useRef(null);
  const lastJobRef = useCallback(
    node => {
      if (jobLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !jobLoading) {
            setPage(prev => prev + 1);
          }
        },
        { rootMargin: '200px' }
      );

      if (node) observer.current.observe(node);
    },
    [jobLoading]
  );

  // Reset page when search query changes
  useEffect(() => {
    setPage(0);
  }, [searchedQuery]);

  // Reset query on unmount
  useEffect(() => {
    return () => dispatch(setSearchedQuery(''));
  }, [dispatch]);

  return (
    <div className="relative">
      <div className="grid-background"></div>
      <div className="max-w-7xl mx-auto py-2 pb-10 px-4 sm:px-6 md:px-8">
        <h1 className="font-bold text-lg sm:text-xl my-5">
          Search Results ({totalJobs})
        </h1>

        {/* Job Listing Grid */}
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

        {/* Infinite Scroll Skeleton Loader */}
        {jobLoading && page > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <JobSkeleton key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
