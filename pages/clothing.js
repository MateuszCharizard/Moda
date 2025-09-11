import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

// Mock Supabase auth for demo purposes
const supabase = {
  auth: {
    getSession: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        data: {
          session: {
            user: {
              id: 'mock-user-id-123',
            },
          },
        },
      };
    },
  },
};

export default function Clothing() {
  const [chatInput, setChatInput] = useState('');
  const [chatReplies, setChatReplies] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(false);
  const chatContainerRef = useRef(null);
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push('/auth');
        } else {
          setAuthChecking(false);
        }
      } catch {
        router.push('/auth');
      }
    };
    checkUser();
  }, [router]);

  // Typing animation function
  const typeAssistantReply = (fullText) => {
    let index = 0;
    const interval = 20;

    setChatReplies((prev) => [...prev, { role: 'assistant', content: '' }]);

    const typeChar = () => {
      setChatReplies((prev) => {
        const last = prev[prev.length - 1];
        if (!last || last.role !== 'assistant') return prev;

        const updated = [...prev];
        updated[updated.length - 1] = {
          ...last,
          content: fullText.slice(0, index + 1),
        };
        return updated;
      });

      index++;
      if (index < fullText.length) {
        setTimeout(typeChar, interval);
      }
    };

    typeChar();
  };

  // Submit handler without "Typing..." message
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatReplies((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatLoading(true);
    setChatError(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();

      if (data.reply) {
        typeAssistantReply(data.reply);
      } else {
        setChatReplies((prev) => [...prev, { role: 'assistant', content: 'Sorry, no reply.' }]);
      }
    } catch (err) {
      setChatReplies((prev) => [...prev, { role: 'assistant', content: 'Error contacting AI service.' }]);
      setChatError(true);
    } finally {
      setChatLoading(false);
      setChatInput('');
    }
  };

  const retryChat = () => {
    if (chatReplies.length === 0) return;
    const lastUserMessage = [...chatReplies].reverse().find((msg) => msg.role === 'user');
    if (!lastUserMessage) return;
    setChatReplies((prev) => [...prev, { role: 'user', content: lastUserMessage.content }]);
    setChatInput(lastUserMessage.content);
    setTimeout(() => {
      handleChatSubmit({ preventDefault: () => {} });
    }, 0);
  };

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatReplies]);

  if (authChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <svg
          className="animate-spin h-8 w-8 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-3xl flex flex-col flex-grow">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-6 p-4"
          aria-live="polite"
          aria-relevant="additions"
          role="log"
          style={{ maxHeight: 'calc(100vh - 150px)', scrollBehavior: 'smooth' }}
        >
          {chatReplies.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
              <h1 className="text-2xl font-semibold mb-2">Clothing Assistant</h1>
              <p>Ask me anything about our clothing collection...</p>
            </div>
          )}
          {chatReplies.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`
                  max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap
                  ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Lazy loading spinner here instead of in chat */}
        {chatLoading && (
          <div className="flex justify-center mb-2">
            <svg
              className="animate-spin h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        )}

        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about our clothing..."
            className="w-full border text-neutral-500 border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-10 transition bg-slate-200 shadow-sm"
            disabled={chatLoading}
            aria-label="Chat input"
            autoComplete="off"
            inputMode="text"
          />
          <button
            type="button"
            onClick={handleChatSubmit}
            disabled={chatLoading || !chatInput.trim()}
            className="absolute right-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300"
            aria-label="Send message"
          >
            {chatLoading ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {chatError && (
          <div className="mt-2 text-red-500 text-sm flex items-center justify-between">
            <p role="alert">There was an error sending your message.</p>
            <button
              onClick={retryChat}
              className="px-2 py-1 text-red-500 hover:text-red-600 text-sm"
              aria-label="Retry sending chat message"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
