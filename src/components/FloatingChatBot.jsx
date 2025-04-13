import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingChatBot = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate('/career-chat-ai')}
        className="flex items-center gap-2 bg-[#6A38C2] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:pl-6 hover:pr-6 group"
        title="Career Chat"
      >
        <MessageCircle className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110" />
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] text-sm whitespace-nowrap">
          Career Advice
        </span>
      </button>
    </div>
  );
};

export default FloatingChatBot;
