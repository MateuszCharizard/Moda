import { useEffect } from 'react';

export const useAccessibility = () => {
  useEffect(() => {
    // Load accessibility settings from localStorage
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
  }, []);
};
