import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const { signUp, signIn } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      let result;
      if (isSignup) {
        result = await signUp(email, password);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        setError(result.error);
      } else {
        setMessage(isSignup ? 'Signup successful!' : 'Login successful!');
        if (!isSignup) {
          setTimeout(() => {
            router.push('/clothing');
          }, 500);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900 overflow-x-hidden">
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {isSignup ? 'Join Moda' : 'Welcome Back'}
        </motion.h1>

        <motion.form
          onSubmit={handleAuth}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <motion.button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-4 text-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-gray-900 font-semibold hover:underline"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </motion.p>

        <motion.p
          className="absolute bottom-10 right-10 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          ’25 — Moda
        </motion.p>
      </motion.section>

      <footer className="bg-[#f4f4f4] text-[#555] py-12 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">Moda &copy; 2025. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-900 transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}