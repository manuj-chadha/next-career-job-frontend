import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job.id}`)} className='p-5 rounded-xl shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div className='flex items-center gap-3'>
                <Button className='p-0.5' variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage className='rounded-full' src={job?.companyLogo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-md'>{job?.companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.location ? job.location : "India"}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards