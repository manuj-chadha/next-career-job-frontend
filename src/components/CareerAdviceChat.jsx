import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import botAvatar from '../assets/bot.png';
import userAvatar from '../assets/user.png';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import API from '@/utils/axios';
import { AI_API_END_POINT } from '@/utils/constant';

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
  const [darkMode, setDarkMode] = useState(false);

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
      "You're a friendly, helpful chatbot assistant in a job portal application. Please give your responses in a conversational, step-by-step way. Only ask 1 or 2 questions at a time. Keep each message concise (3-5 lines max). Use simple formatting and bullet points if needed. Avoid long paragraphs. Now answer: " +
      input;

    const newMessages = [...messages, { sender: 'user', text: input }];
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
        setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: '⚠️ Oops, try again later.' }]);
    }

    setInput('');
    setIsLoading(false);
  };

  const themeClasses = darkMode
    ? 'bg-[#121212] text-white'
    : 'bg-gradient-to-tr from-[#f4f0ff] via-[#e9ddff] to-[#f4f0ff] text-black';

  return (
    <div className={`h-screen w-full ${themeClasses} transition-all duration-500 flex flex-col overflow-hidden`}>
      <Navbar />
      <div className="flex-1 flex justify-center items-start py-4 overflow-hidden">
        <div
          className={`w-full max-w-3xl h-full flex flex-col rounded-3xl p-6 shadow-xl border transition-all duration-500 ${
            darkMode
              ? 'bg-[#1e1e1e] border-gray-700'
              : 'bg-white/40 backdrop-blur-md border-white/20'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#6A38C2]">💡 Ask Career Advice</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Chat Window */}
          <div
            className={`flex-1 overflow-y-auto flex flex-col gap-4 pr-2 mb-4 rounded-xl ${
              darkMode ? 'scrollbar-dark' : 'scrollbar-light'
            }`}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <img
                    src={botAvatar}
                    alt="bot"
                    className="h-8 w-8 rounded-full shadow-sm"
                  />
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-xl text-sm shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-[#6A38C2] text-white rounded-br-none'
                      : darkMode
                      ? 'bg-[#2b2b2b] text-gray-200 rounded-bl-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <img
                    src={user.profile.profilePhoto || userAvatar}
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
            className={`flex items-center gap-3 ${
              darkMode ? 'bg-[#2a2a2a]' : 'bg-white/80'
            } p-3 rounded-full shadow-md border transition`}
          >
            <input
              type="text"
              className={`flex-1 px-4 py-2 rounded-full outline-none text-sm ${
                darkMode ? 'bg-[#2a2a2a] text-white' : 'bg-transparent text-black'
              }`}
              placeholder="Ask about resume, career paths, interviews..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              onClick={handleSend}
              className="rounded-full bg-[#6A38C2] hover:bg-[#5128a1] transition-colors"
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
