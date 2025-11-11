import React, { useEffect, useRef, useCallback, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import Job from '../components/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import JobSkeleton from '../components/skeletons/JobSkeleton';
import Footer from '../components/shared/Footer';

const Browse = () => {
    const dispatch = useDispatch();
    const { allJobs, jobLoading, searchedQuery, totalJobs } = useSelector(store => store.job);

    const [page, setPage] = useState(0);

    // Call your hook with current page

    const observer = useRef();
    const lastJobRef = useCallback(node => {
        if (jobLoading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log("Fetching next page...");
                setPage(prev => prev + 1);
            }
        }, { rootMargin: "200px" });

        if (node) observer.current.observe(node);
    }, [jobLoading]);

    // Reset page when search query changes
    useEffect(() => {
        setPage(0);
    }, [searchedQuery]);

    // Reset query on unmount
    useEffect(() => {
        return () => dispatch(setSearchedQuery(""));
    }, []);

    // if(jobLoading) return (
    //     <>
    //     {Array.from({ length: 3 }).map((_, idx) => (
    //         <JobSkeleton key={idx} />
    //     ))}
    //     </>
    // )
    return (
        <div className='relative'>
            <div className="grid-background"></div>
            <div className='max-w-7xl mx-auto py-2 pb-10 px-4 sm:px-6 md:px-8'>
                <h1 className='font-bold text-lg sm:text-xl my-5'>
                    Search Results ({totalJobs})
                </h1>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {allJobs.map((job, index) => {
                        if (index === allJobs.length - 1) {
                            return <Job ref={lastJobRef} key={job.id} job={job} />;
                        } else {
                            return <Job key={job.id} job={job} />;
                        }
                    })}
                </div>
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
