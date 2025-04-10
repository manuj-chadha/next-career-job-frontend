import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Briefcase, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Recruiter = () => {
    const [jobTitle, setJobTitle] = useState("");
    const navigate = useNavigate();

    const handlePostJob = () => {
        navigate("/recruiter/post-job", { state: { draftTitle: jobTitle } });
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-[#F1F1F1] text-[#F83002]  font-medium tracking-wide flex items-center justify-center gap-2 w-fit'>
                    <Sparkles className='w-4 h-4' />
                    Join Top Employers
                </span>

                <h1 className='text-5xl font-bold leading-tight'>
                    Find the <span className='text-[#6A38C2]'>Perfect Candidates</span><br />
                    Without the Hassle
                </h1>

                <p className='text-gray-600 max-w-xl mx-auto'>
                    Instantly post jobs, manage applications, and hire the right talent with our powerful recruitment tools.
                </p>

                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Enter job title to post (e.g., Frontend Developer)'
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className='outline-none border-none w-full text-sm py-3'
                    />
                    <Button onClick={handlePostJob} className="rounded-r-full bg-[#6A38C2] hover:bg-[#574479]">
                        <Briefcase className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Recruiter
