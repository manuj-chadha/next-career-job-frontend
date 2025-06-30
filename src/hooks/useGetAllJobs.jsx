import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setJobLoading } from '@/redux/jobSlice';
import API from '@/utils/axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, lastFetched, allJobs } = useSelector(store => store.job);
  const intervalRef = useRef(null);
  const FETCH_INTERVAL = 10 * 60 * 1000;

  const fetchJobs = async (showLoader) => {
    try {
      if (showLoader) dispatch(setJobLoading(true));

      const res = await API.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (err) {
      console.error("Error fetching allJobs:", err?.message);
    } finally {
      if (showLoader) dispatch(setJobLoading(false));
    }
  };

  useEffect(() => {
    const now = Date.now();
    const isStale = !lastFetched || now - lastFetched > FETCH_INTERVAL;

    // 🚫 Skip fetching if allJobs are fresh
    if (!isStale && allJobs.length > 0) return;

    // ✅ Show loader only if no allJobs yet
    fetchJobs(isStale || allJobs.length === 0);

    // 🔁 Set up background refresh
    intervalRef.current = setInterval(() => {
      fetchJobs(false); // silent refresh
    }, FETCH_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [searchedQuery]);
};


export default useGetAllJobs;
