import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Recruiter from './admin/Recruiter'
import FloatingChatBot from './FloatingChatBot'
import Faqs from './Faqs'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  return (
    
    <div>
      <div className='relative'>
      <div className="grid-background"> </div>
      {
        user?.role?.toLowerCase() === 'recruiter' ? <Recruiter />
         : <>
         <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <FloatingChatBot />
         </>
      }
      </div>
      <Faqs />
      </div>
  )
}

export default Home