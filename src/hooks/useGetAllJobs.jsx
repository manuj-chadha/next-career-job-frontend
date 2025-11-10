import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setJobLoading, setTotalJobs } from '@/redux/jobSlice';
import API from '@/utils/axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = (page = 0, size = 12) => {
  const dispatch = useDispatch();
  const { searchedQuery, lastFetched, allJobs } = useSelector(store => store.job);
  const intervalRef = useRef(null);
  const FETCH_INTERVAL = 10 * 60 * 1000;

  const fetchJobsInternal = useCallback(async (showLoader = false) => {
    try {
      // Only show loader if there are no jobs cached and showLoader requested
      if (showLoader && (!allJobs || allJobs.length === 0)) {
        dispatch(setJobLoading(true));
      }

      const res = await API.get(
        `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(searchedQuery || '')}&page=${page}&size=${size}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        const newJobs = res.data.jobs || [];
        const updatedJobs = page === 0 ? newJobs : [...(allJobs || []), ...newJobs];
        dispatch(setAllJobs(updatedJobs));
        dispatch(setTotalJobs(res.data.totalElements || 0));
      }
    } catch (err) {
      console.error("Error fetching jobs:", err?.message);
    } finally {
      if ((!allJobs || allJobs.length === 0) && showLoader) {
        // hide loader only if we displayed it
        dispatch(setJobLoading(false));
      }
    }
  }, [dispatch, searchedQuery, page, size, allJobs]);

  useEffect(() => {
    // Let the browser paint first: schedule fetch during idle or small timeout
    const scheduleInitial = () => {
      // if jobs already exist -> fetch in background without loader
      const showLoader = !(allJobs && allJobs.length > 0);

      if ('requestIdleCallback' in window) {
        // requestIdleCallback with timeout ensures it runs eventually
        requestIdleCallback(() => fetchJobsInternal(showLoader), { timeout: 1000 });
      } else {
        // small delay to allow paint and CSS/Fonts to load
        setTimeout(() => fetchJobsInternal(showLoader), 200);
      }
    };

    scheduleInitial();

    // set up polling (fire-and-forget, no loader)
    intervalRef.current = setInterval(() => {
      fetchJobsInternal(false);
    }, FETCH_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [fetchJobsInternal, searchedQuery, page]);

};

export default useGetAllJobs;
