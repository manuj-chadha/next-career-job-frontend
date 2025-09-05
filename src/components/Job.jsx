import React, { forwardRef } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import API from '@/utils/axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';

const Job = forwardRef(({ job }, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const saveJob = async (jobId) => {
        try {
            const res = await API.get(`/users/save/${jobId}`, { withCredentials: true });
            if (res.status === 200 && res.data?.success) {
                toast.success("Saved successfully.");
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.error("Error saving job:", error);
            toast.error("Error saving job.");
        }
    };

    const daysAgo = (dateStr) => {
        const diff = new Date() - new Date(dateStr);
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const isSaved = user?.savedJobs?.some(id => id.toString() === job.id.toString());

    return (
        <div ref={ref} className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-xs text-gray-500'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className='rounded-full' size="icon">
                    {isSaved ? <BookmarkCheck /> : <Bookmark />}
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-4" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.companyLogo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-md'>{job?.companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold text-xs'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold text-xs'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold text-xs'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button className='cursor-pointer text-sm' onClick={()=> navigate(`/description/${job?.id}`)} variant="outline">Details</Button>
                <Button onClick={() => saveJob(job.id)} className={`cursor-pointer text-sm ${isSaved ? "bg-[#242121]" : "bg-[#7209b7]"}`}>
                    {isSaved ? "Saved" : "Save for Later"}
                </Button>
            </div>
        </div>
    );
});

export default Job;
