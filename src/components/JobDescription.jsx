import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import API from '@/utils/axios';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const applyJobHandler = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.status === 201) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?.id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success('Job applied successfully.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await API.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data?.job?.applications?.some(
              application => application.applicantId === user?.id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?.id]);

  return (
    <div className="max-w-5xl mx-auto my-12 px-6">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg md:text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="text-blue-700 font-medium bg-blue-100">{singleJob?.postion} Positions</Badge>
              <Badge className="text-red-700 font-medium bg-red-100">{singleJob?.jobType}</Badge>
              <Badge className="text-purple-700 font-medium bg-purple-100">{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={!isApplied && !isLoading ? applyJobHandler : null}
            disabled={isApplied || isLoading}
            className={`rounded-lg px-4 py-2 text-white text-xs font-semibold transition ${
              isApplied || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
            }`}
          >
            {isLoading ? 'Please wait...' : isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Section Divider */}
        <hr className="border-gray-300" />

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          <p><span className="font-semibold">Role:</span> {singleJob?.title}</p>
          <p><span className="font-semibold">Location:</span> {singleJob?.location}</p>
          <p><span className="font-semibold">Experience:</span> {singleJob?.experience} yrs</p>
          <p><span className="font-semibold">Salary:</span> {singleJob?.salary} LPA</p>
          <p><span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length || 0}</p>
          <p><span className="font-semibold">Posted Date:</span> {singleJob?.createdAt?.split('T')[0] || 'NaN'}</p>
        </div>

        {/* Description Section */}
        <div className="space-y-4 mt-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Job Description</h2>
            <p className="text-sm leading-relaxed text-gray-700">{singleJob?.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Requirements</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {singleJob?.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
