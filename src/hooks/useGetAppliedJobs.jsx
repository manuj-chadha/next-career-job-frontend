import { setAllAppliedJobs, setAppliedJobsFetched, setAppliedJobsLoading } from "@/redux/jobSlice";
import API from "@/utils/axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAppliedJobs = () => {
    const { appliedJobsFetched }=useSelector(store => store.job);
    const dispatch = useDispatch();

    
    useEffect(()=>{
        if(appliedJobsFetched) return;
        const fetchAppliedJobs = async () => {
            try {
                dispatch(setAppliedJobsLoading(true));
                const res = await API.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                if(res.status===200){
                    // console.log(res.data.applications);
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setAppliedJobsLoading(false));                    
                dispatch(setAppliedJobsFetched(true));
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;