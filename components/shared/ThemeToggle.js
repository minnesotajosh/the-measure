'use client';

import { useEffect, useState } from 'react';
import { LS_THEME } from '../../lib/storage';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    // Stored as a raw string (not JSON), matching the inline no-flash
    // theme script in the root layout, which reads it before React hydrates.
    try {
      localStorage.setItem(LS_THEME, next);
    } catch (e) {}
    setTheme(next);
  }

  return (
    <button className="footer-link" onClick={toggle} aria-pressed={theme === 'dark'}>
      {theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode'}
    </button>
  );
}
