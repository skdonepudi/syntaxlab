export interface Language {
  id: number;
  value: string;
  label: string;
  sampleFileName: string;
}

export interface LanguagesDropdownProps {
  language: Language;
  onSelectChange: (selectedLanguage: Language) => void;
}
