import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import API from "@/utils/axios";

const GoogleCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const called = useRef(false);

  const fetchResponse = async (code, role) => {
    try {
      const res = await API.get(`https://next-career-job-backend.onrender.com/api/auth/google/callback`, {
        params: { code, role },
        withCredentials: true
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (e) {
      console.log(e?.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    const code = params.get("code");
    const role = params.get("state");

    if (!code || !role) {
      console.error("Missing code or role");
      navigate("/login");
      return;
    }
    if (!called.current) {
      called.current = true;
      fetchResponse(code, role);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm text-center">
        {/* Spinner with logo */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Google Login"
              className="h-12 w-12 animate-pulse"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
          Authenticating with Google...
        </h2>

        {/* Description */}
        <p className="text-sm text-white/80 max-w-xs mx-auto">
          We’re logging you in securely. This might take a moment. Please don’t refresh the page.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mt-2">
          <div className="h-full w-1/3 bg-white animate-loading-bar rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
