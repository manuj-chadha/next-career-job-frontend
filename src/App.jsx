import { lazy, Suspense } from 'react';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import UserRoute from './components/UserRoute';
import ProtectedRoute from './components/admin/ProtectedRoute';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Browse = lazy(() => import('./components/Browse'));
const Profile = lazy(() => import('./pages/Profile'));
const JobDescription = lazy(() => import('./components/JobDescription'));
const Companies = lazy(() => import('./components/admin/Companies'));
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'));
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'));
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'));
const PostJob = lazy(() => import('./components/admin/PostJob'));
const Applicants = lazy(() => import('./components/admin/Applicants'));
const UpdateJob = lazy(() => import('./components/admin/UpdateJob'));
const CareerAdviceChat = lazy(() => import('./pages/CareerAdviceChat'));
const GoogleCallback = lazy(() => import('./components/auth/GoogleCallback'));



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
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    }>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}


export default App
