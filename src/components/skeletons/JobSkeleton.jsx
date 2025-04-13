import React from 'react';
import { Button } from '../ui/button';

const JobSkeleton = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 animate-pulse">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-gray-200 rounded-md" />
        <Button variant="outline" className="rounded-full" size="icon">
          <div className="h-5 w-5 bg-gray-200 rounded-md" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 my-4">
        <Button className="p-4" variant="outline" size="icon">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        </Button>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
          <div className="h-3 w-20 bg-gray-100 rounded-md" />
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-2 mb-4">
        <div className="h-5 w-48 bg-gray-200 rounded-md" />
        <div className="h-4 w-full bg-gray-100 rounded-md" />
        <div className="h-4 w-3/4 bg-gray-100 rounded-md" />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <div className="h-8 w-24 bg-gray-200 rounded-md" />
        <div className="h-8 w-32 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default JobSkeleton;
