import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
      } else {
        setUser(session.user);
      }
    };
    checkUser();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900">
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900">
          Your Profile
        </h1>
        <p className="text-gray-700 text-lg">Email: {user.email}</p>
        <motion.button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/auth');
          }}
          className="mt-4 bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Log Out
        </motion.button>
      </motion.section>
    </div>
  );
}