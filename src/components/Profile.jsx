import React, { useEffect, useRef, useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Edit2, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useDispatch, useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import Footer from './shared/Footer';
import { toast } from 'sonner';
import API from '@/utils/axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { setUser } from '@/redux/authSlice';
import defaultPic from "../assets/image.png";
import SavedPosts from './SavedPosts';
import useGetSavedPosts from '@/hooks/useGetSavedPosts';


const Profile = () => {
  useGetAppliedJobs();
  useGetSavedPosts();
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const { user } = useSelector(store => store.auth);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profile?.profilePhoto);
  const [isUploading, setIsUploading] = useState(false);
  
  const dispatch=useDispatch();
  
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // preview immediately
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.put(`${USER_API_END_POINT}/profile/picture/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      // console.log(res);
      

      if (res.status === 200) {
        toast.success("Profile picture updated successfully");
        dispatch(setUser(res.data.data));
        setOpened(false);
      }
    } catch (error) {
      toast.error("Error updating profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);
  // console.log(user);
  
  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 max-md:mx-2">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-row max-md:flex-col items-center gap-6 lg:mt-4">
            <div className='flex flex-row justify-between max-md:w-full'>
              <Popover open={opened} onOpenChange={setOpened}>
                <PopoverTrigger>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={previewImage ? previewImage : defaultPic} alt="profile" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit -mt-16 max-md:ml-4 rounded-lg py-1.5 px-2 shaded-lg bg-gray-50 z-50 max-sm:mr-3">
                  <div onClick={handleEditClick} className='w-fit flex items-center gap-2 cursor-pointer text-sm'>
                    <Edit2 className='w-3' />
                    <span className='text-sm'>{isUploading ? "Uploading..." : "Edit"}</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </PopoverContent>
              </Popover>

              {(window.innerWidth < 768) &&
                <Button onClick={() => setOpen(true)} className="self-start sm:self-center" variant="outline">
                  <Pen className="w-4 h-4" />
                </Button>
              }
            </div>
            <div className='max-md:flex flex-col justify-start items-start gap-2'>
              <h1 className="font-bold text-xl sm:text-2xl pb-1 text-start">{user?.fullname}</h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio ? user.profile.bio : "Update and write about yourself."}</p>
            </div>
          </div>

          {(window.innerWidth >= 768) &&
            <Button onClick={() => setOpen(true)} className="self-start sm:self-center" variant="outline">
              <Pen className="w-4 h-4" />
            </Button>
          }
        </div>

        <div className="my-5 space-y-2 text-sm">
          <div className="flex items-center gap-3 break-all">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 break-all">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h2 className="text-md font-bold pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length
              ? user.profile.skills.map((item, index) => (
                <Badge key={index} className="px-2 py-1">{item}</Badge>
              ))
              : <span>You haven't added any skills.</span>}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user?.profile?.resume}
              className="text-white w-fit hover:underline cursor-pointer text-sm bg-black px-5 py-2 rounded-3xl break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>No resume uploaded.</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4 my-10">
        <h1 className="font-bold text-lg my-5">Saved Posts</h1>
        <SavedPosts jobs={user?.savedJobs} />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
