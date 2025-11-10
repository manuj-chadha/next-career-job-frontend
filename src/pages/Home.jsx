import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Recruiter from '../components/admin/Recruiter'
import FloatingChatBot from '../components/FloatingChatBot'
import Faqs from '../components/Faqs'


const Home = () => {
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