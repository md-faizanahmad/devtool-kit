import { create } from 'zustand';
import type { AppSettings } from '@/types/settings';
import { settingsStorage } from '@/shared/settings-storage';

interface AppState {
  appName: string;
  settings: AppSettings;
  loadSettings: () => Promise<void>;
  updateSettings: (settings: AppSettings) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  appName: 'DevTool-Kit',
  settings: {
    theme: 'system',
  },

  loadSettings: async () => {
    try {
      const settings = await settingsStorage.get();
      set({ settings });
    } catch (error) {
      console.error('Failed to load application settings:', error);
    }
  },

  updateSettings: async (settings) => {
    await settingsStorage.set(settings);
    set({ settings });
  },
}));
