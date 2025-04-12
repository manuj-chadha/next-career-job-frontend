import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import API from '@/utils/axios';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map((skill) => skill).join(', ') || '',
    resumeUrl: user?.profile?.resume || '',
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const resume = e.target.files?.[0];
    setInput({ ...input, resume });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', input.email);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);

    if (input.resume instanceof File) {
      formData.append('resume', input.resume);
    } else {
      formData.append('resumeUrl', input.resumeUrl);
    }

    try {
      setLoading(true);
      const res = await API.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUser(res.data.data));
        toast.success('Credentials updated successfully.');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby="profile-dialog-description"
        className="w-[90vw] sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
        
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { label: 'Name', id: 'name', name: 'fullname', type: 'text', value: input.fullname },
              { label: 'Email', id: 'email', name: 'email', type: 'email', value: input.email },
              { label: 'Number', id: 'number', name: 'phoneNumber', type: 'text', value: input.phoneNumber },
              { label: 'Bio', id: 'bio', name: 'bio', type: 'text', value: input.bio },
              { label: 'Skills', id: 'skills', name: 'skills', type: 'text', value: input.skills },
            ].map(({ label, id, name, type, value }) => (
              <div key={id} className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4 max-md:gap-2">
                <Label htmlFor={id} className="text-left sm:text-right max-md:text-md">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={name}
                  type={type}
                  value={value}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 max-md:text-sm"
                />
              </div>
            ))}

            <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4 max-md:gap-2">
              <Label htmlFor="file" className="text-left sm:text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="sm:col-span-3 max-md:text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
