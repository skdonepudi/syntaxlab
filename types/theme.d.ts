export interface Theme {
  id: string;
  name: string;
}

export interface ThemeDropdownProps {
  theme: string;
  onThemeChange: (selectedTheme: string) => void;
}
