import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setJobLoading, setTotalJobs } from '@/redux/jobSlice';
import API from '@/utils/axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = (page = 0, size = 12) => {
  const dispatch = useDispatch();
  const { searchedQuery, allJobs } = useSelector(store => store.job);
  const intervalRef = useRef(null);
  const FETCH_INTERVAL = 10 * 60 * 1000; // 10 minutes

  const fetchJobs = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) dispatch(setJobLoading(true));

      const res = await API.get(
        `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(searchedQuery || '')}&page=${page}&size=${size}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        const newJobs = res.data.jobs || [];
        dispatch(setAllJobs(page === 0 ? newJobs : [...allJobs, ...newJobs]));
        dispatch(setTotalJobs(res.data.totalElements || 0));
      }
    } catch (err) {
      console.error('Error fetching jobs:', err?.message);
    } finally {
      if (showLoader) dispatch(setJobLoading(false));
    }
  }, [dispatch, searchedQuery, page, size]);

  useEffect(() => {
    // clean any previous intervals before scheduling
    if (intervalRef.current) clearInterval(intervalRef.current);

    // defer initial fetch to let paint happen first
    const showLoader = !(allJobs && allJobs.length > 0);
    const delayedFetch = () => fetchJobs(showLoader);

    if ('requestIdleCallback' in window) {
      requestIdleCallback(delayedFetch, { timeout: 1000 });
    } else {
      setTimeout(delayedFetch, 300);
    }

    // background refresh every 10 min, no loader
    intervalRef.current = setInterval(() => fetchJobs(false), FETCH_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [fetchJobs, searchedQuery, page]);
};

export default useGetAllJobs;
