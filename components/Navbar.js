import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkVariants = {
    hover: { scale: 1.05, color: '#1a202c' },
    tap: { scale: 0.95 },
  };

  return (
    <nav className="bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] text-gray-900 font-serif sticky top-0 z-50 border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Moda
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link href="/contact" className="text-lg hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link href="/explore" className="text-lg hover:text-gray-900 transition-colors">
              Explore
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link href="/clothing" className="text-lg hover:text-gray-900 transition-colors">
              ClothingAI
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link href="/clothing" className="text-lg hover:text-gray-900 transition-colors">
              Collection
            </Link>
          </motion.div>
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href={user ? '/profile' : '/auth'}
              className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            >
              {user ? 'Profile' : 'Login'}
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-[#f4f4f4] px-6 py-4 border-t border-gray-300"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            <Link href="/contact" className="text-lg hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              Contact
            </Link>
            <Link href="/explore" className="text-lg hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              Explore
            </Link>
            <Link href="/clothing" className="text-lg hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              ClothingAI
            </Link>
            <Link href="/clothing" className="text-lg hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              Collection
            </Link>
            <Link
              href={user ? '/profile' : '/auth'}
              className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors text-center"
              onClick={toggleMenu}
            >
              {user ? 'Profile' : 'Login'}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}