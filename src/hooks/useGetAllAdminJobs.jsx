import { setAllAdminJobs } from '@/redux/jobSlice'
import API from '@/utils/axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await API.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    if(res.data.jobs.length>0) dispatch(setAllAdminJobs(res.data.jobs));
                    else dispatch(setAllAdminJobs(null));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs