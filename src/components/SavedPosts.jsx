import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Job from './Job';
import API from '@/utils/axios';
import { JOB_API_END_POINT } from '@/utils/constant';
// import { setJobLoading } from '@/redux/jobSlice';

const SavedPosts = () => {
  const [jobs, setJobs]=useState([]);
  const dispatch=useDispatch();
  useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                // dispatch(setJobLoading(true));
                const res = await API.get(`${JOB_API_END_POINT}/savedJobs`,{ withCredentials:true });
                console.log(res);
                
                if(res.status === 200){
                    setJobs(res.data.savedJobs);
                }
            } catch (error) {                
            } finally {
                // dispatch(setJobLoading(false));
                console.log("loading");
                
            }
        }
        fetchAllJobs();
    },[]);
    console.log(jobs);
    
  return  jobs?.length === 0 ? <p>No saved jobs found</p> 
  : <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobs.map((job) => (
            <Job key={job.id} job={job} />
        ))}
    </div>
  
}

export default SavedPosts