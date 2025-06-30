import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import JobSkeleton from './skeletons/JobSkeleton';

const Jobs = () => {
  const { allJobs, filters, searchedQuery, jobLoading } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  const parseSalaryRange = (rangeStr) => {
    switch (rangeStr) {
      case "3-6 LPA":
        return [3, 6];
      case "6-12 LPA":
        return [6, 12];
      case "12-24 LPA":
        return [12, 24];
      default:
        return [0, Infinity];
    }
  };
  

  useEffect(() => {
    let result = allJobs;
    // console.log(result);
    

    if (filters.location) {
        console.log(filters.location);
        
      result = result.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.industry) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }

    if (filters.salary) {
      const [min, max] = parseSalaryRange(filters.salary);
      result = result.filter(job =>
        job.salary >= min && job.salary <= max
      );
    }

    if (searchedQuery) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }

    setFilterJobs(result);
  }, [allJobs, filters, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className='max-w-8xl mx-auto mt-5 sm:px-6 md:px-8'>
        {/* Mobile Filter Toggle Button */}
        <div className='lg:hidden mb-4'>
          <button
            onClick={() => setShowFilter(true)}
            className='flex items-center gap-2 border px-4 py-2 rounded-md text-sm'>
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className='flex flex-col lg:flex-row gap-5 relative'>
          {/* Desktop Sidebar */}
          <div className='hidden lg:block lg:w-1/5'>
            <FilterCard />
          </div>

          {/* Mobile Popover Filter Panel */}
          {showFilter && (
            <div className='lg:hidden absolute top-0 left-0 w-full h-fit z-50 bg-white shadow-xl rounded-lg px-5 overflow-y-auto max-h-fit'>
              <div className='flex justify-end mb-4'>
                <button onClick={() => setShowFilter(false)} className='text-gray-500 hover:text-black'>
                  <X />
                </button>
              </div>
              <FilterCard />
            </div>
          )}

          {/* Job Listings */}
          <div className='flex-1 h-[88vh] overflow-y-auto px-2 pb-5'>
            {
              jobLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <JobSkeleton key={idx} />
                  ))}
                </div>
              ) : filterJobs.length <= 0 ? (
                <span className='text-center text-gray-500'>Sorry, no jobs found.</span>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?.id}>
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
