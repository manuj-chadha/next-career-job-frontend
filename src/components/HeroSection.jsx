import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <motion.div
            className='text-center overflow-x-hidden'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className='flex flex-col gap-5 my-10'>
                <motion.span
                    className='mx-auto px-4 py-1 rounded-full bg-gray-100 text-[#F83002] text-sm font-medium'
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    No. 1 Job Hunt Website
                </motion.span>

                <h1 className='text-4xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>

                <p className='max-w-2xl mx-auto px-4 text-sm text-gray-600'>
                    Job portal designed to help users effortlessly explore job opportunities, apply with ease,
                    and secure their ideal roles across various industries.
                </p>

                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 text-sm rounded-full items-center gap-4 mx-auto overflow-hidden max-sm:w-[80%]'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full py-2 bg-transparent text-gray-700'
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6]"
                        aria-label="Search"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
