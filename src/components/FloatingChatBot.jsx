// FloatingChatBot.tsx
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import CareerAdviceChat from './CareerAdviceChat';

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="relative w-[370px] h-[500px]">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-red-500"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <CareerAdviceChat />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#6A38C2] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all"
          title="Career Chat"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default FloatingChatBot;
