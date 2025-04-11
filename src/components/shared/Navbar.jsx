import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2, X, Building2, Briefcase, Home, Search, Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import defaultPic from "../../assets/image.png";
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import API from '@/utils/axios';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await API.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true });
            if (res.status === 200) {
                dispatch(setUser(null));
                navigate("/login");
                localStorage.setItem("token", "");
                toast.success("Logged out successfully.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error logging out!");
        }
    };

    const navItemClasses = 'transition-all duration-200 hover:text-[#6A38C2] hover:scale-105';
    const navItemMobileClasses='transition-all duration-200 hover:text-[#6A38C2] hover:scale-105 shadow-sm rounded-b-lg px-4 py-3';
    return (
        <div className="bg-white z-50 shadow-sm rounded-lg relative overflow-x-hidden">
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-3'>
                <h1 className='text-2xl max-sm:text-xl font-bold'>
                    Next<span className='text-[#F83002]'>Career</span>
                </h1>

                {/* Desktop Nav */}
                <ul className='hidden md:flex font-medium text-md items-center gap-6'>
                    {user && user.role.toLowerCase() === 'recruiter' ? (
                        <>
                            <li><Link to="/admin/companies" className={navItemClasses}>Companies</Link></li>
                            <li><Link to="/admin/jobs" className={navItemClasses}>Jobs</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/" className={navItemClasses}>Home</Link></li>
                            <li><Link to="/jobs" className={navItemClasses}>Jobs</Link></li>
                            <li><Link to="/browse" className={navItemClasses}>Browse</Link></li>
                            <li><Link to="/career-chat-ai" className={navItemClasses}>Career AI</Link></li>
                        </>
                    )}
                </ul>

                {/* Desktop Auth */}
                <div className='hidden md:flex items-center gap-4'>
                    {!user ? (
                        <>
                            <Link to="/login"><Button variant="outline" className='transition hover:scale-105'>Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition hover:scale-105">Signup</Button></Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border-2 max-w-16 border-gray-500'>
                                    <AvatarImage src={user?.profile?.profilePhoto || defaultPic} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 max-w-xs sm:max-w-sm overflow-x-hidden mx-2">
                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto || defaultPic} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-lg'>{user?.fullname}</h4>
                                            <p className='text-sm mt-1 text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-gray-700'>
                                        {user?.role?.toLowerCase() === 'student' && (
                                            <div className='flex items-center gap-2'>
                                                <User2 size={18} />
                                                <Link to="/profile">
                                                    <Button variant="link" className='text-sm'>View Profile</Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2'>
                                            <LogOut size={18} />
                                            <Button variant="link" className='text-sm' onClick={logoutHandler}>Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-3">
                    <button onClick={() => setIsMobileMenuOpen(prev => !prev)}>
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border-2 border-gray-500'>
                                    <AvatarImage src={user?.profile?.profilePhoto || defaultPic} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 max-w-xs sm:max-w-sm overflow-x-hidden">
                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto || defaultPic} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 text-gray-700'>
                                        {user?.role?.toLowerCase() === 'student' && (
                                            <div className='flex items-center gap-2'>
                                                <User2 size={18} />
                                                <Link to="/profile">
                                                    <Button variant="link">View Profile</Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2'>
                                            <LogOut size={18} />
                                            <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-white shadow-inner px-4 pb-4"
                    >
                        <ul className="flex flex-col gap-4 font-medium mt-2">
                            {user && user.role.toLowerCase() === 'recruiter' ? (
                                <>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2'>
                                            <Home size={18} /> Home
                                        </Link>
                                    </li>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/admin/companies" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2'>
                                            <Building2 size={18} /> Companies
                                        </Link>
                                    </li>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/admin/jobs" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2'>
                                            <Briefcase size={18} /> Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-3'>
                                            <Home size={18} /> Home
                                        </Link>
                                    </li>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-3'>
                                            <Briefcase size={18} /> Jobs
                                        </Link>
                                    </li>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/browse" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-3'>
                                            <Search size={18} /> Browse
                                        </Link>
                                    </li>
                                    <li className={navItemMobileClasses}>
                                        <Link to="/career-chat-ai" onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-3'>
                                            <Bot size={18} /> Career AI
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        {!user && (
                            <div className='flex flex-col gap-2 mt-4'>
                                <Link to="/login"><Button variant="outline" className="w-full transition hover:scale-105">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full transition hover:scale-105">Signup</Button></Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
