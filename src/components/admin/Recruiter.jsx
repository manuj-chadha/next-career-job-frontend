import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Briefcase, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Recruiter = () => {
    const [jobTitle, setJobTitle] = useState("");
    const navigate = useNavigate();

    const handlePostJob = () => {
        navigate("/admin/jobs/create", { state: { draftTitle: jobTitle } });
    }

    return (
        <div className='text-center px-4'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-[#F1F1F1] text-[#F83002] font-medium tracking-wide flex items-center justify-center gap-2 w-fit text-sm'>
                    <Sparkles className='w-4 h-4' />
                    Join Top Employers
                </span>

                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
                    Find the <span className='text-[#6A38C2]'>Perfect Candidates</span><br />
                    Without the Hassle
                </h1>

                <p className='text-gray-600 max-w-xl mx-auto text-sm sm:text-base'>
                    Instantly post jobs, manage applications, and hire the right talent with our powerful recruitment tools.
                </p>

                {/* Responsive input + button */}
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl mx-auto px-3 sm:px-0'>
                    <input
                        type="text"
                        placeholder='Enter job title to post (e.g., Frontend Developer)'
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className='flex-1 px-4 py-3 text-sm border border-gray-300 rounded-full outline-none'
                    />
                    <Button
                        onClick={handlePostJob}
                        className="rounded-full bg-[#6A38C2] hover:bg-[#574479] w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <Briefcase className='h-5 w-5' />
                        <span className='hidden sm:inline'>Post Job</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Recruiter
