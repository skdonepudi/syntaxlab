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
        <SelectItem key={lang.id} value={lang.id.toString()}>
          {lang.label}
        </SelectItem>
      )),
    []
  );

  return (
    <Select onValueChange={handleValueChange} value={language.id.toString()}>
      <SelectTrigger className="w-[280px] h-[40px] border-2 border-gray-300 rounded-md">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>{languageOptions}</SelectContent>
    </Select>
  );
};

export default LanguagesDropdown;
