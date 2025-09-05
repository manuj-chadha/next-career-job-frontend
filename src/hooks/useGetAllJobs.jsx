import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setJobLoading } from '@/redux/jobSlice';
import API from '@/utils/axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = (page = 0, size = 12) => {
  const dispatch = useDispatch();
  const { searchedQuery, lastFetched, allJobs } = useSelector(store => store.job);
  const intervalRef = useRef(null);
  const FETCH_INTERVAL = 10 * 60 * 1000;

  const fetchJobs = async (showLoader) => {
    try {
      if (showLoader) dispatch(setJobLoading(true));

      const res = await API.get(
        `${JOB_API_END_POINT}/get?keyword=${searchedQuery}&page=${page}&size=${size}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        // Append instead of replacing
        const newJobs = res.data.jobs;
        const updatedJobs = page === 0 ? newJobs : [...allJobs, ...newJobs];

        dispatch(setAllJobs(updatedJobs));

        // Optionally store metadata
        // dispatch(setJobMeta({ totalPages: res.data.totalPages, currentPage: res.data.currentPage }));
      }
    } catch (err) {
      console.error("Error fetching jobs:", err?.message);
    } finally {
      if (showLoader) dispatch(setJobLoading(false));
    }
  };

  useEffect(() => {
    const now = Date.now();
    const isStale = !lastFetched || now - lastFetched > FETCH_INTERVAL;

    fetchJobs(true);

    intervalRef.current = setInterval(() => {
      fetchJobs(false);
    }, FETCH_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [searchedQuery, page]); // depends on both keyword and page
};

export default useGetAllJobs;
