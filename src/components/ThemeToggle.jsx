import { useEffect, useState } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);
  const dark = theme === 'dark';
  return <button className="theme-toggle" type="button" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>
    {dark ? <IconSun size={18} aria-hidden="true" /> : <IconMoon size={18} aria-hidden="true" />}<span>{dark ? 'Light' : 'Dark'}</span>
  </button>;
}
