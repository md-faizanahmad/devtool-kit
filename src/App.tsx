import { Route, Routes } from 'react-router';
import HomePage from './components/layout/HomePage';
import { useAppStore } from './stores/app.store';
import { useEffect } from 'react';

function App() {
  const loadSettings = useAppStore((state) => state.loadSettings);

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
