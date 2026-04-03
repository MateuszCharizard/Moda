import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';

export default function Profile() {
  const { user, signOut, changePassword, deleteAccount } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [accessibility, setAccessibility] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('accessibility_settings') || '{"fontSize": "normal", "highContrast": false}');
    }
    return { fontSize: 'normal', highContrast: false };
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    localStorage.setItem('accessibility_settings', JSON.stringify(accessibility));
    
    // Trigger storage event for other components to listen
    const event = new StorageEvent('storage', {
      key: 'accessibility_settings',
      newValue: JSON.stringify(accessibility),
      url: window.location.href,
    });
    window.dispatchEvent(event);

    // Apply settings immediately
    if (accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }

    const fontSizeMap = {
      small: '14px',
      normal: '16px',
      large: '18px',
    };
    document.documentElement.style.fontSize = fontSizeMap[accessibility.fontSize] || '16px';
  }, [accessibility]);

  const handleLogout = async () => {
    await signOut();
    router.push('/auth');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.new.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    const result = await changePassword(user.email, passwordForm.old, passwordForm.new);
    if (result.error) {
      setPasswordError(result.error);
    } else {
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ old: '', new: '', confirm: '' });
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    if (!deletePassword) {
      setDeleteError('Please enter your password');
      return;
    }

    const result = await deleteAccount(user.email, deletePassword);
    if (result.error) {
      setDeleteError(result.error);
    } else {
      router.push('/auth');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea]">
        <svg
          className="animate-spin h-8 w-8 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900 transition-colors"
      style={{ backgroundColor: accessibility.highContrast ? '#000000' : undefined, color: accessibility.highContrast ? '#ffffff' : undefined }}
    >
      <motion.div
        className="max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-12 text-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Your Profile
        </motion.h1>

        {/* Tabs */}
        <motion.div
          className="flex gap-4 mb-8 border-b-2 border-gray-300 flex-wrap justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {['overview', 'password', 'accessibility', 'account'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-colors ${
                activeTab === tab ? 'border-b-4 border-gray-900 text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            className="bg-white rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="border-b pb-4">
                <p className="text-gray-600 mb-2">Email Address</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-gray-600 mb-2">Member Since</p>
                <p className="font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <motion.button
                onClick={handleLogout}
                className="mt-6 w-full bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log Out
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <motion.div
            className="bg-white rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.old}
                  onChange={(e) => setPasswordForm({ ...passwordForm, old: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900"
                  required
                />
              </div>
              {passwordError && <p className="text-red-600 font-semibold">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-600 font-semibold">{passwordSuccess}</p>}
              <motion.button
                type="submit"
                className="w-full bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Update Password
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <motion.div
            className="bg-white rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">Font Size</h3>
                <div className="flex gap-4 flex-wrap">
                  {['small', 'normal', 'large'].map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setAccessibility({ ...accessibility, fontSize: size })}
                      className={`px-6 py-2 rounded-full font-semibold transition-all ${
                        accessibility.fontSize === size
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      } text-${size}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">Display Options</h3>
                <label className="flex items-center cursor-pointer gap-4">
                  <input
                    type="checkbox"
                    checked={accessibility.highContrast}
                    onChange={(e) => setAccessibility({ ...accessibility, highContrast: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                  <span className="font-semibold">High Contrast Mode</span>
                </label>
              </div>
              <p className="text-gray-600 text-sm italic">Settings are saved automatically</p>
            </div>
          </motion.div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <motion.div
            className="bg-white rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="border-4 border-red-200 bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-600 mb-3">Danger Zone</h3>
                <p className="text-gray-700 mb-6">
                  Deleting your account is permanent and cannot be undone. All your data will be removed.
                </p>

                {!showDeleteConfirm ? (
                  <motion.button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full bg-red-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete Account
                  </motion.button>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-semibold text-gray-900">Please enter your password to confirm:</p>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900"
                    />
                    {deleteError && <p className="text-red-600 font-semibold">{deleteError}</p>}
                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword('');
                          setDeleteError('');
                        }}
                        className="flex-1 bg-gray-300 text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleDeleteAccount}
                        className="flex-1 bg-red-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete Permanently
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}