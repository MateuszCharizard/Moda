import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';

export default function Clothing() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea]">
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
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900 overflow-x-hidden">
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Maintenance Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <svg
            className="w-24 h-24 text-gray-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Under Maintenance
        </motion.h1>

        {/* Issue Description */}
        <motion.div
          className="max-w-2xl mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Clothing Collection page is currently offline for optimization and improvements.
          </p>

          {/* Issue Details Box */}
          <motion.div
            className="bg-white border-2 border-gray-300 rounded-lg p-8 text-left shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Happening</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-xl">•</span>
                <span>Removed third-party AI integration to streamline backend infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">•</span>
                <span>Redesigning collection interface for a cleaner, faster experience</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">•</span>
                <span>Implementing local data management for improved reliability</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">•</span>
                <span>Expected to return shortly with enhanced features</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-gray-600 text-lg">Thank you for your patience</p>
          <motion.a
            href="/profile"
            className="bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Profile
          </motion.a>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="absolute bottom-10 right-10 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Coming Soon
        </motion.p>
      </motion.section>
    </div>
  );
}
