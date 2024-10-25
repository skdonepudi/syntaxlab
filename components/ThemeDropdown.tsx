import React from "react";
import { Theme, ThemeDropdownProps } from "@/types/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/constants/themes";

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <Select onValueChange={onThemeChange} value={theme}>
      <SelectTrigger className="w-full md:w-[280px] h-[40px] border-2 border-gray-300 rounded-md dark:border-gray-700 dark:bg-slate-800">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-[#011727]">
        {themes.map((t: Theme) => (
          <SelectItem
            key={t.id}
            value={t.id}
            className={`${
              t.id === theme ? "bg-gray-300 dark:bg-slate-700" : ""
            } hover:bg-gray-200 dark:hover:bg-slate-600`}
          >
            {t.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ThemeDropdown;
