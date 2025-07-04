import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import API from "@/utils/axios";

const GoogleCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const called=useRef(false);

  const fetchResponse=async(code, role)=>{
    try {
        const res=await API.get(`https://next-career-job-backend.onrender.com/api/auth/google/callback`, {
            params: { code, role },
            withCredentials: true
        });
        if(res.status===200){
          console.log(res.data);
          console.log(res);
          
            localStorage.setItem("token", res.data.token);
            dispatch(setUser(res.data.user))
            navigate("/");
        }
    } catch (e) {
        console.log(e?.message); 
        navigate("/login");
    }

  }

  useEffect(() => {
    const code = params.get("code");
    const role=params.get("state");

    if (!code || !role) {
      console.error("Missing code or role");
      navigate("/login");
      return;
    }
    if (!called.current) {
      called.current = true; // ✅ set lock
      fetchResponse(code, role);
    }
  }, []);

  return (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
    <div className="flex flex-col items-center gap-6 animate-fade-in-down">
      <div className="relative">
        <div className="h-20 w-20 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/logo.png" // Replace with your logo or keep default
            alt="Google Login"
            className="h-10 w-10 animate-pulse"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-wide">Authenticating with Google...</h2>
      <p className="text-sm text-white/80 max-w-xs text-center">
        We’re logging you in securely. This might take a moment. Please don't refresh the page.
      </p>

      <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-white animate-loading-bar rounded-full" />
      </div>
    </div>
  </div>
);

};

export default GoogleCallback;
