import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './components/layout/HomePage';
import JsonFormatter from './features/json-formatter/JsonFormatter';
import { useAppStore } from './stores/app.store';
import Base64Converter from './features/base64-converter/Base64Converter';
import UrlEncoder from './features/url-encoder/UrlEncoder';
import UuidGenerator from './features/uuid-generator/UuidGenerator';
import TimestampConverter from './features/timestamp-converter/TimestampConverter';

function App() {
  const loadSettings = useAppStore((state) => state.loadSettings);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/json-formatter" element={<JsonFormatter />} />
      <Route path="/base64-converter" element={<Base64Converter />} />
      <Route path="/url-encoder" element={<UrlEncoder />} />
      <Route path="/uuid-generator" element={<UuidGenerator />} />
      <Route path="/timestamp-converter" element={<TimestampConverter />} />
    </Routes>
  );
}

export default App;
