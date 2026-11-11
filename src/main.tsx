import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { DEFAULT_SETTINGS } from '@/shared/default-settings';
import { settingsStorage } from '@/shared/settings-storage';
import '@/index.css';
import App from '@/App';

async function initializeTheme() {
  try {
    const settings = await settingsStorage.get();
    const theme = settings.theme;

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const resolvedTheme =
      theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

    document.documentElement.dataset.theme = resolvedTheme;
  } catch (error) {
    console.error('Failed to initialize theme:', error);

    document.documentElement.dataset.theme =
      DEFAULT_SETTINGS.theme === 'dark' ? 'dark' : 'light';
  }
}

async function bootstrap() {
  await initializeTheme();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  );
}

void bootstrap();
