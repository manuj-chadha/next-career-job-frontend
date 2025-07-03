import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Job from './Job';
import API from '@/utils/axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import store from '@/redux/store';
import { setJobLoading } from '@/redux/jobSlice';
import JobSkeleton from './skeletons/JobSkeleton';
import LatestJobCardsSkeleton from './skeletons/LatestJobCardsSkeleton';
// import { setJobLoading } from '@/redux/jobSlice';

const SavedPosts = () => {
//   const [jobs, setJobs]=useState([]);
  const dispatch=useDispatch();
  const { savedJobs, savedJobsLoading, savedJobsFetched } = useSelector(store => store.job);
  
  if (savedJobsLoading && !savedJobsFetched) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <JobSkeleton key={idx} />
      ))}
    </div>
  );
}

    
  return  savedJobs?.length === 0 ? <p>No saved jobs found</p> 
  : <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {savedJobs.map((job) => (
            <Job key={job.id} job={job} />
        ))}
    </div>
  
}

export default SavedPosts