import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import UpdateJob from './components/admin/UpdateJob'
import CareerAdviceChat from './components/CareerAdviceChat'
import UserRoute from './components/UserRoute'
import GoogleCallback from './components/auth/GoogleCallback'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <UserRoute><Home /></UserRoute>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/oauth2/callback',
    element: <GoogleCallback />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <UserRoute><Jobs /></UserRoute>
  },
  {
    path: "/career-chat-ai",
    element: <UserRoute><CareerAdviceChat /></UserRoute>
  },
  {
    path: "/description/:id",
    element: <UserRoute><JobDescription /></UserRoute>
  },
  {
    path: "/browse",
    element: <UserRoute><Browse /></UserRoute>
  },
  {
    path: "/profile",
    element: <UserRoute><Profile /></UserRoute>
  },
  // admin ke liye yha se start hoga
  // {
  //   path:"/recruiter",
  //   element: <ProtectedRoute><Recruiter/></ProtectedRoute>
  // },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/update/:id",
    element:<ProtectedRoute><UpdateJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
