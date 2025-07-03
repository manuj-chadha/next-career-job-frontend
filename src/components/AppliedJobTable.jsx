import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppliedJobsSkeleton from './skeletons/AppliedJobsSkeleton'

const AppliedJobTable = () => {
  const { allAppliedJobs, appliedJobsLoading, appliedJobsFetched } = useSelector(store => store.job)
  const navigate = useNavigate();

  if(appliedJobsLoading && !appliedJobsFetched) return <AppliedJobsSkeleton />
  return (
    <div className="w-full overflow-x-auto px-2 sm:px-0">
      <Table className="min-w-[600px] sm:min-w-full">
        <TableCaption className="py-4">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs.map(appliedJob => (
              <TableRow
                className="cursor-pointer hover:bg-muted/20"
                key={appliedJob.id}
                onClick={() =>
                  navigate(`/description/${appliedJob.job.id}`)
                }
              >
                <TableCell>
                  {appliedJob?.appliedAt?.split('T')[0]}
                </TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status?.toLowerCase() === 'rejected'
                        ? 'bg-red-400'
                        : appliedJob.status.toLowerCase() === 'pending'
                        ? 'bg-gray-400'
                        : 'bg-green-400'
                    }`}
                  >
                    {appliedJob.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
