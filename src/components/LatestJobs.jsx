import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="w-full max-w-7xl mx-auto px-12 my-20">
      <h1 className="text-3xl md:text-3xl font-bold text-center md:text-left mb-6">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      {allJobs?.length <= 0 ? (
        <div className="text-center text-gray-500">No Job Available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
