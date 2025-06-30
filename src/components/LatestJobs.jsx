import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import LatestJobCardsSkeleton from './skeletons/LatestJobCardsSkeleton';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import store from '@/redux/store';

const LatestJobs = () => {
  const navigate=useNavigate();
  const { allJobs, jobLoading } = useSelector(store => store.job);
  // console.log(allJobs);
  // console.log(jobLoading);
  
  

  return (
  <div className="w-full max-w-7xl mx-auto px-8 my-20">
      <h1 className="text-3xl md:text-3xl font-bold text-center md:text-left mb-6">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      <div>
          {jobLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <LatestJobCardsSkeleton key={index} />
            ))}
          </div>
          ) : (
            allJobs?.length <= 0 ? (
              <div className="text-center text-gray-500">No Jobs available currently.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allJobs?.slice(0, 6).map((job) => (
                  <LatestJobCards key={job.id} job={job} />
                ))}
              </div>
            )
          )}
      </div>
      <div className='w-full flex justify-center'>
      <Button onClick={() => navigate("/browse")} className='mt-6 shadow-sm'>View more...</Button>
      </div>      
    </div>
  );
};

export default LatestJobs;
