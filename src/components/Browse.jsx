import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
import JobSkeleton from './skeletons/JobSkeleton';

const Browse = () => {
    // useGetAllJobs();
    const { allJobs, jobLoading } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-5 px-4 sm:px-6 md:px-8'>
                <h1 className='font-bold text-lg sm:text-xl my-5'>
                    Search Results ({allJobs.length})
                </h1>
                {
                    jobLoading ? 
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <JobSkeleton key={idx} />
                  ))}
                </div> :  
                
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {allJobs.map((job) => (
                        <Job key={job.id} job={job} />
                    ))}
                </div>
                }
            </div>
            <Footer />
        </div>
    );
};

export default Browse;
