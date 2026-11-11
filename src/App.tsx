import { Route, Routes } from 'react-router';
import HomePage from './components/layout/HomePage';
import { useAppStore } from './stores/app.store';
import { useEffect } from 'react';

function App() {
  const loadSettings = useAppStore((state) => state.loadSettings);
  const theme = useAppStore((state) => state.settings.theme);

  useEffect(() => {
    const applyTheme = () => {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;

      const resolvedTheme =
        theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
      document.documentElement.dataset.theme = resolvedTheme;
    };

    applyTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [theme]);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
