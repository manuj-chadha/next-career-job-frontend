import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Moon, Sun, MessageSquareText } from 'lucide-react';
import { Button } from './ui/button';
import botAvatar from '../assets/bot.png';
import userAvatar from '../assets/image.png';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import API from '@/utils/axios';
import { AI_API_END_POINT } from '@/utils/constant';
import ReactMarkdown from 'react-markdown';

const CareerAdviceChat = () => {
  const { user } = useSelector(store => store.auth);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hey there! I\'m your AI career coach. Ask me anything about resumes, interviews, or job switching.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const query =
      "You're a friendly AI assistant for students on a job portal—answer career and job-related queries in a short, step-by-step, conversational style with 1–2 follow-up questions, using simple language and bullet points where helpful. Now answer: " +
      input;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setInput('');
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await API.post(
        `${AI_API_END_POINT}/career-advice`,
        { query },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // console.log(response.data.reply);
        
        setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: '⚠️ Oops, try again later.' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className={`h-screen w-full bg-gradient-to-tr from-[#f4f0ff] via-[#e9ddff] to-[#f4f0ff] text-black transition-all duration-500 flex flex-col overflow-hidden`}>
      <Navbar />
      <div className="flex-1 flex justify-center items-start py-4 px-2 sm:px-4 md:px-6 overflow-hidden">
        <div
          className="w-full h-full max-w-3xl flex flex-col rounded-3xl p-4 sm:p-6 shadow-xl border transition-all duration-500 bg-white/40 backdrop-blur-md border-white/20"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {/* Icon only on mobile */}
              <div className="block sm:hidden">
                <MessageSquareText className="w-5 h-5 text-[#6A38C2]" />
              </div>
              <h2 className="text-lg sm:text-2xl font-semibold text-[#6A38C2]">Ask Career Advice</h2>
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 mb-4 rounded-xl scrollbar-light">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } group`}
              >
                {msg.sender === 'bot' && (
                  <img
                    src={botAvatar}
                    alt="bot"
                    className="h-8 w-8 rounded-full shadow-sm"
                  />
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-xl text-sm shadow-md transition-transform group-hover:scale-[1.02] ${
                    msg.sender === 'user'
                      ? 'bg-[#6A38C2] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                {msg.sender === 'user' && (
                  <img
                    src={user?.profile?.profilePhoto || userAvatar}
                    alt="user"
                    className="h-8 w-8 rounded-full shadow-sm"
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="text-sm italic text-gray-500">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-3 bg-white/80 p-3 rounded-full shadow-md border transition">
            <input
              type="text"
              className='flex-1 px-4 py-2 rounded-full outline-none text-sm bg-transparent text-black'
              placeholder="Ask about resume, career paths, interviews..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              onClick={handleSend}
              className="rounded-full bg-[#6A38C2] hover:bg-[#5128a1] transition-all hover:scale-105"
            >
              <SendHorizonal className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerAdviceChat;
