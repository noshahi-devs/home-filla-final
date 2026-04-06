export interface SystemSetting {
  id: number;
  key: string;
  value: string;
  description?: string;
}

export interface SettingsGroup {
  name: string;
  id: 'general' | 'contact' | 'social' | 'profile';
  icon: string;
}
