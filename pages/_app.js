import '../styles/globals.css';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../lib/AuthContext';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Apply accessibility settings on mount and listen for changes
    const applyAccessibilitySettings = () => {
      const savedSettings = localStorage.getItem('accessibility_settings');
      const settings = savedSettings ? JSON.parse(savedSettings) : { fontSize: 'normal', highContrast: false };

      // Apply high contrast mode
      if (settings.highContrast) {
        document.documentElement.classList.add('high-contrast-mode');
      } else {
        document.documentElement.classList.remove('high-contrast-mode');
      }

      // Apply font size
      const fontSizeMap = {
        small: '14px',
        normal: '16px',
        large: '18px',
      };
      document.documentElement.style.fontSize = fontSizeMap[settings.fontSize] || '16px';
    };

    applyAccessibilitySettings();

    // Listen for storage changes (e.g., from other tabs or profile page)
    window.addEventListener('storage', applyAccessibilitySettings);
    return () => window.removeEventListener('storage', applyAccessibilitySettings);
  }, []);

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}