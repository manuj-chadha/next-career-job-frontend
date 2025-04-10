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

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user?.role.toLowerCase() === 'recruiter') {
  //     navigate("/recruiter");
  //   }
  // }, [user, navigate]);
  return (
    <div>
      <Navbar />
      {
        user?.role?.toLowerCase() === 'recruiter' ? <Recruiter />
         : <>
         <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
         </>
      }
      <Footer />
      
    </div>
  )
}

export default Home