import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import { useSelector } from 'react-redux'
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