import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import GoogleLoginWithRole from './GoogleLoginWithRole';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) formData.append('file', input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="font-extrabold text-2xl mb-6 text-center text-black">
          Create Account ✨
        </h1>

        {/* Full Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
              required
              className="mt-2 bg-white/60 text-xs sm:text-sm placeholder:text-xs"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
              required
              className="mt-2 bg-white/60 text-xs sm:text-sm placeholder:text-xs"
            />
          </div>
        </div>

        {/* Phone + Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              required
              className="mt-2 bg-white/60 text-xs sm:text-sm placeholder:text-xs"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter a strong password"
              required
              className="mt-2 bg-white/60 text-xs sm:text-sm placeholder:text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

  {/* Profile Picture */}
  <div>
    <Label className="mb-2 block w-9/12">Profile Picture</Label>
    <Input
      accept="image/*"
      type="file"
      onChange={changeFileHandler}
      className="mt-2 cursor-pointer bg-white/60 text-xs placeholder:text-xs"
    />
  </div>

  {/* Role selection */}
  <div className="flex flex-col gap-3">
    <Label>Role</Label>
    <div className='flex gap-3'>
      <Button
      type="button"
      variant={input.role === 'student' ? 'default' : 'outline'}
      className="flex-1"
      onClick={() => setInput({ ...input, role: 'student' })}
    >
      Student
    </Button>
    <Button
      type="button"
      variant={input.role === 'recruiter' ? 'default' : 'outline'}
      className="flex-1"
      onClick={() => setInput({ ...input, role: 'recruiter' })}
    >
      Recruiter
    </Button>
    </div>
  </div>
</div>



        {/* Submit */}
        {loading ? (
          <Button className="w-full my-4" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
        )}

        {/* Already have account */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        <div className="text-sm flex justify-center items-center py-1 gap-3">
          <span>Signup with</span>
          <GoogleLoginWithRole />
        </div>
      </form>
    </div>
  );
};

export default Signup;
