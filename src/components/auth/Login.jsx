import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import API from '@/utils/axios'
import GoogleLoginWithRole from './GoogleLoginWithRole'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await API.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                localStorage.setItem("token", data.token);
                // console.log(data.userDTO);
                
                dispatch(setUser(data.userDTO));
                navigate("/");
                toast.success("Logged in successfully.");
            }
        } catch (error) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGoogleLogin = () => {
        const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
        const role = "STUDENT"; // or "recruiter"
        const finalAuthUrl = `${GOOGLE_AUTH_URL}&state=${role}`;
        window.location.href = finalAuthUrl;
    };
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="h-screen flex items-center justify-center 
  bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 px-4">

  <form 
    onSubmit={submitHandler} 
    className="w-full max-w-md bg-white/80 backdrop-blur-xl 
    border border-white/30 rounded-2xl shadow-2xl p-8"
  >
    <h1 className="font-extrabold text-2xl mb-6 text-center text-black drop-shadow">
      Welcome Back 👋
    </h1>

    {/* Email */}
    <div className="mb-4">
      <Label>Email</Label>
      <Input
        type="email"
        value={input.email}
        name="email"
        onChange={changeEventHandler}
        placeholder="Enter your email"
        required
        className="mt-2 bg-white/60 border-1 max-sm:text-xs placeholder:text-xs"
      />
    </div>

    {/* Password */}
    <div className="mb-4">
      <Label>Password</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={input.password}
          name="password"
          onChange={changeEventHandler}
          placeholder="Enter your password"
          required
          className="mt-2 bg-white/60 border-1 max-sm:text-xs placeholder:text-xs pr-10"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    {/* Role selection */}
    <div className="flex gap-3 my-5">
      <Button
        type="button"
        variant={input.role === "student" ? "default" : "outline"}
        className="flex-1"
        onClick={() => setInput({ ...input, role: "student" })}
      >
        Student
      </Button>
      <Button
        type="button"
        variant={input.role === "recruiter" ? "default" : "outline"}
        className="flex-1"
        onClick={() => setInput({ ...input, role: "recruiter" })}
      >
        Recruiter
      </Button>
    </div>

    {/* Submit button */}
    {loading ? (
      <Button className="w-full my-4" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </Button>
    ) : (
      <Button type="submit" className="w-full my-4 cursor-pointer">Login</Button>
    )}

    {/* Signup link */}
    <p className="text-sm text-center text-gray-600">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
    </p>

    {/* Divider */}
    <div className="flex items-center my-5">
      <div className="flex-1 border-t border-gray-300"></div>
      <span className="px-3 text-sm text-gray-500">or</span>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>

    {/* Google login */}
    <div className='text-sm flex justify-center items-center gap-3'>
                        <span>Login with</span>
                        <GoogleLoginWithRole className="w-full" />
                    </div>
    {/* <GoogleLoginWithRole className="w-full" /> */}
  </form>
</div>

    )
}

export default Login;
