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
      const res = await API.get(`/auth/google/callback`, {
        params: { code, role },
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (e) {
      console.error(e?.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 px-4 py-10 sm:px-6 md:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-6 sm:gap-8 transition-all duration-300">
        
        {/* Spinner */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <div className="absolute inset-0 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Next Career Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse-slow"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-2xl font-bold tracking-wide text-gray-900 leading-snug">
          Authenticating with Google...
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-700 max-w-xs sm:max-w-sm mx-auto leading-relaxed px-2">
          We’re logging you in securely. This might take a few seconds.
          Please don’t refresh or close this tab.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2 sm:mt-3">
          <div className="h-full w-1/3 bg-indigo-500 animate-progress-smooth rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
