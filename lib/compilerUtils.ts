import { Language } from "@/types/language";

export const handleCompile = async (
  language: Language,
  code: string,
  customInput: string
): Promise<object> => {
  const response = await fetch("/api/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    }),
  });

  if (response.status === 429) throw new Error("Quota of 50 requests exceeded for the Day!");
  if (response.status === 408) throw new Error("Execution timed out.");
  if (!response.ok) throw new Error("Execution failed. Please try again.");

  return response.json();
};
