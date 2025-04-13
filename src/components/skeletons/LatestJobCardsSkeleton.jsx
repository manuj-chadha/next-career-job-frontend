import React from 'react';
import { Button } from '../ui/button';
import { Avatar } from '@radix-ui/react-avatar';

const LatestJobCardsSkeleton = () => {
  return (
    <div className="p-5 rounded-xl shadow-sm bg-white border border-gray-100 animate-pulse">
      <div className="flex items-center gap-3">
        <Button className="p-0.5" variant="outline" size="icon">
          <Avatar>
            <div className="w-10 h-10 bg-gray-100 rounded-full" />
          </Avatar>
        </Button>
        <div className="w-32 space-y-1">
          <div className="h-4 bg-gray-200 rounded-md" />
          <div className="h-3 bg-gray-100 rounded-md" />
        </div>
      </div>
      <div className="my-4 space-y-2">
        <div className="h-6 bg-gray-200 rounded-md" />
        <div className="h-4 bg-gray-100 rounded-md" />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="h-5 w-24 bg-gray-200 rounded-md" />
        <div className="h-5 w-20 bg-gray-200 rounded-md" />
        <div className="h-5 w-20 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default LatestJobCardsSkeleton;
