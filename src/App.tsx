import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './components/layout/HomePage';
import JsonFormatter from './features/json-formatter/JsonFormatter';
import { useAppStore } from './stores/app.store';
import Base64Converter from './features/base64-converter/Base64Converter';
import UrlEncoder from './features/url-encoder/UrlEncoder';
import UuidGenerator from './features/uuid-generator/UuidGenerator';
import TimestampConverter from './features/timestamp-converter/TimestampConverter';
import ColorConverter from './features/color-converter/ColorConverter';
import TextCaseConverter from './features/text-case-converter/TextCaseConverter';
import PasswordGenerator from './features/password-generator/PasswordGenerator';
import RegexTester from './features/regex-tester/RegexTester';
import MarkdownPreviewer from './features/markdown-previewer/MarkdownPreviewer';
import HtmlFormatter from './features/html-formatter/HtmlFormatter';
import CssFormatter from './features/css-formatter/CssFormatter';

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
      <Route path="/color-converter" element={<ColorConverter />} />
      <Route path="/text-case-converter" element={<TextCaseConverter />} />
      <Route path="/password-generator" element={<PasswordGenerator />} />
      <Route path="/regex-tester" element={<RegexTester />} />
      <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
      <Route path="/html-formatter" element={<HtmlFormatter />} />
      <Route path="/css-formatter" element={<CssFormatter />} />
    </Routes>
  );
}

export default App;
