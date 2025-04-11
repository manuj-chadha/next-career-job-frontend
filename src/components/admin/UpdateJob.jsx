import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import API from '@/utils/axios';
import useGetJobById from '@/hooks/useGetJobById';

const UpdateJob = () => {
  const params = useParams();
  useGetJobById(params.id);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: 0,
    position: 0,
    company: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { singleJob } = useSelector(store => store.job);
  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await API.put(`${JOB_API_END_POINT}/update/${params.id}`, {
        ...input,
        requirements: input.requirements.split(','),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      requirements: singleJob?.requirements?.join(", ") || "",
      salary: singleJob?.salary || 0,
      location: singleJob?.location || "",
      jobType: singleJob?.jobType || "",
      experience: singleJob?.experience || 0,
      position: singleJob?.position || 0,
      company: singleJob?.company?.name || ""
    });
  }, [singleJob]);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5 max-sm:p-1'>
        <form onSubmit={submitHandler} className='p-8 max-sm:px-2 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
        <h1 className='font-bold mb-6 text-lg sm:text-xl'>Update Job Credentials</h1>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Title</Label>
              <Input name="title" value={input.title} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input name="requirements" value={input.requirements} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>Salary (in LPA)</Label>
              <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>Experience Level (in years)</Label>
              <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="my-1 max-sm:text-sm mt-2" />
            </div>
            {
              companies.length > 0 && (
                <div className='col-span-2'>
                  <Label>Company</Label>
                  <Select
                    onValueChange={(value) => setInput({ ...input, company: value })}
                    value={input.company.toLowerCase()}
                    
                  >
                    <SelectTrigger className="w-full my-1 max-sm:text-sm mt-2">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          companies.map((company) => (
                            <SelectItem key={company._id} value={company.name.toLowerCase()}>
                              {company.name}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )
            }
          </div>
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">Update Job</Button>
          )}
          {companies.length === 0 && (
            <p className='text-xs text-red-600 font-bold text-center my-3'>
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
