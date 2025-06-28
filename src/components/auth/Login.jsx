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

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center px-4'>
                <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-200 rounded-md p-6 my-10 shadow-md">
                    <h1 className='font-bold text-xl mb-6 text-center'>Login</h1>

                    <div className='mb-4'>
                        <Label className='pb-2'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            className='text-sm'
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <Label className='pb-2'>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                className='text-sm pr-10'
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-2 text-gray-600"
                                aria-required
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <RadioGroup className="flex items-center justify-center gap-6 my-5 max-sm:my-1">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="recruiter">Recruiter</Label>
                        </div>
                    </RadioGroup>

                    {
                        loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Login</Button>
                        )
                    }

                    <span className='text-sm block text-center'>
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className='text-blue-600 underline'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login;
