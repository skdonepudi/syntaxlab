import { loader } from "@monaco-editor/react";
import { monacoThemes } from "@/constants/themes";

export const defineTheme = (theme: string) => {
  return new Promise<void>((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};
