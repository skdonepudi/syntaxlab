import { useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/languages";
import { Language, LanguagesDropdownProps } from "@/types/language";

const LanguagesDropdown: React.FC<LanguagesDropdownProps> = ({
  language,
  onSelectChange,
}) => {
  const handleValueChange = useCallback(
    (value: string) => {
      const selectedLang = languages.find(
        (lang) => lang.id.toString() === value
      );
      if (selectedLang) {
        onSelectChange(selectedLang);
      }
    },
    [onSelectChange]
  );

  const languageOptions = useMemo(
    () =>
      languages.map((lang: Language) => (
        <SelectItem
          key={lang.id}
          value={lang.id.toString()}
          className={`${
            lang.id === language.id ? "bg-gray-300 dark:bg-slate-700" : ""
          } hover:bg-gray-200 dark:hover:bg-slate-600`}
        >
          {lang.label}
        </SelectItem>
      )),
    [language.id] // Add language.id as a dependency
  );

  return (
    <Select onValueChange={handleValueChange} value={language.id.toString()}>
      <SelectTrigger className="w-full md:w-[280px] h-[40px] border-2 border-gray-300 rounded-md dark:border-gray-700 dark:bg-slate-800">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="bg-white  dark:bg-[#011727]  ">
        {languageOptions}
      </SelectContent>
    </Select>
  );
};

export default LanguagesDropdown;
