import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import API from '@/utils/axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            console.log("Hii");
            console.log(applicants);
            
            const obj={ "status": status}
            axios.defaults.withCredentials = true;
            const res = await API.put(`${APPLICATION_API_END_POINT}/status/${id}/update`, obj, { 
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
             });
            console.log(res);
            if (res.status === 200) {
                toast.success("Status updated successfully.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applicants?.map((item) => (
                            <tr key={item.applicantId}>
                                <TableCell>{item?.name}</TableCell>
                                <TableCell>{item?.email}</TableCell>
                                <TableCell>{item?.contact}</TableCell>
                                <TableCell >
                                    {
                                        item?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.resume} target="_blank" rel="noopener noreferrer">{item?.resumeName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.appliedAt?.split("T")[0] ? item.appliedAt.split("T")[0] : "NaN"}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?.applicationId)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable