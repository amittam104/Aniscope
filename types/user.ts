export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme?: "light" | "dark" | "system";
  emailNotifications?: boolean;
  language?: string;
}
