import React from 'react';
import { Button } from '../ui/button';

const JobDescriptionSkeleton = () => {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-100 animate-pulse space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 bg-gray-200 rounded-md" /> {/* Job title */}
        <div className="h-10 w-32 bg-gray-200 rounded-md" /> {/* Apply button */}
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>

      {/* Job details */}
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-4 w-full bg-gray-100 rounded-md" />
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2 mt-4">
        <div className="h-5 w-32 bg-gray-200 rounded-md" /> {/* Section title */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="h-4 w-full bg-gray-100 rounded-md" />
        ))}
      </div>

      {/* Requirements */}
      <div className="space-y-2 mt-4">
        <div className="h-5 w-36 bg-gray-200 rounded-md" /> {/* Section title */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-4 w-full bg-gray-100 rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default JobDescriptionSkeleton;
