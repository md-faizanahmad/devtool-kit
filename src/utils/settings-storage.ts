import type { AppSettings } from '@/types/settings';
import { STORAGE_KEYS } from './storage-keys';
import { storage } from './storage';
import { DEFAULT_SETTINGS } from './default-settings';

export const settingsStorage = {
  async get(): Promise<AppSettings> {
    const settings = await storage.get<AppSettings>(STORAGE_KEYS.SETTINGS);

    return settings ?? DEFAULT_SETTINGS;
  },

  async set(settings: AppSettings): Promise<void> {
    await storage.set(STORAGE_KEYS.SETTINGS, settings);
  },
};
