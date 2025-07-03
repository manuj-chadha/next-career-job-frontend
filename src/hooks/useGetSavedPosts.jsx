import { setAllSavedJobs, setAppliedJobsLoading, setSavedJobsFetched, setSavedJobsLoading } from "@/redux/jobSlice";
import store from "@/redux/store";
import API from "@/utils/axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetSavedPosts = () => {
    const dispatch = useDispatch();
    const {savedJobsFetched}=useSelector(store => store.job);

    useEffect(()=>{
        if(savedJobsFetched) return;
        const fetchSavedJobs = async () => {
            try {
                dispatch(setSavedJobsLoading(true));
                const res = await API.get(`${JOB_API_END_POINT}/savedJobs`,{ withCredentials:true });
                // console.log(res);
                
                if(res.status === 200){
                    // setJobs(res.data.savedJobs);
                    dispatch(setAllSavedJobs(res.data.savedJobs));
                    dispatch(setSavedJobsFetched(true));
                }
            } catch (error) {                
            } finally {
                dispatch(setSavedJobsLoading(false));
                console.log("loading");
                
            }
        }
        fetchSavedJobs();
        },[dispatch, savedJobsFetched]);
};
export default useGetSavedPosts;