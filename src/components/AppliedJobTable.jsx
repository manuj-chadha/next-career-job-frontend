import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    const navigate=useNavigate();
    useEffect(()=>{
        console.log(allAppliedJobs)

        },[])
    return (
        <div>
            <Table>
                <TableCaption className='py-4'>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs?.length >= 0 ?  allAppliedJobs.map((appliedJob) => (
                            <TableRow className='cursor-pointer' key={appliedJob.id} onClick={()=> navigate(`/description/${appliedJob.job.id}`)}>
                                <TableCell>{appliedJob?.appliedAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status?.toLowerCase() === "rejected" ? 'bg-red-400' : appliedJob.status.toLowerCase() === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status?.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        )) :  <tr className='h-16'><td className='px-4'>You haven't applied to any job yet.</td></tr>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable