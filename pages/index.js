import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900 overflow-x-hidden">
      {/* Hero Section - Moda Virtual Fashion Assistant */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Where Style <br /> Meets Technology.
        </motion.h1>

        {/* Illustration */}
        <motion.div
          className="relative w-[470px] h-[430px] mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Image
            src="/test.png" // Replace with your fashion-related PNG
            alt="Moda Virtual Fashion Assistant"
            fill
            className="object-contain drop-shadow-2xl"
          />

          {/* Annotations */}
          <p className="absolute top-[20%] right-[-35%] text-sm text-gray-700 italic">
            AI-powered <br /> style advice
          </p>
          <p className="absolute bottom-[35%] left-[-40%] text-sm text-gray-700 italic">
            Personalized <br /> outfit picks
          </p>
          <p className="absolute bottom-[15%] left-[-25%] text-sm text-gray-700 italic">
            Smart <br /> wardrobe sync
          </p>
        </motion.div>

        {/* Features + CTA */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-gray-700 text-lg">Your personal stylist, available <span className="font-semibold">24/7</span></p>
          <motion.a
            href="/auth"
            className="bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Styling
          </motion.a>
        </motion.div>

        {/* Location / Footer Note */}
        <motion.p
          className="absolute bottom-10 right-10 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          ’25 — Moda
        </motion.p>
      </motion.section>

      {/* Footer */}
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
