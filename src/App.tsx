import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './components/layout/HomePage';
import JsonFormatter from './features/json-formatter/JsonFormatter';
import { useAppStore } from './stores/app.store';

function App() {
  const loadSettings = useAppStore((state) => state.loadSettings);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/json-formatter" element={<JsonFormatter />} />
    </Routes>
  );
}

export default App;
