import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Briefcase } from "lucide-react";

const GoogleLoginWithRole = () => {
  const [open, setOpen] = useState(false);

  const handleGoogleLogin = (role) => {

    const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
    const finalAuthUrl = `${GOOGLE_AUTH_URL}&state=${role}`;
    window.location.href = finalAuthUrl;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

        <Button className='bg-white/60 text-black rounded-md hover:bg-white/50'><img src="https://img.clerk.com/static/google.svg?width=80" alt="Google" /><span>Google</span></Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs rounded-2xl shadow-xl border border-gray-200">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-bold tracking-wide text-gray-800">
            Continue as
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Choose your role to continue with Google
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            onClick={() => handleGoogleLogin("STUDENT")}
            className="flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition duration-150 bg-black text-white"
          >
            <User className="w-4 h-4" />
            Login as Student
          </Button>

          <Button
            onClick={() => handleGoogleLogin("RECRUITER")}
            className="flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium shadow-md hover:shadow-md transition duration-150 bg-white text-black hover:bg-gray-50"
          >
            <Briefcase className="w-4 h-4" />
            Login as Recruiter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleLoginWithRole;
