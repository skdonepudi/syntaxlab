export type AIAction = "explain" | "fix" | "optimize" | "translate";

export function selectModel(action: AIAction): string {
  if (action === "optimize" || action === "translate") {
    return "claude-sonnet-4-6";
  }
  return "claude-haiku-4-5-20251001";
}

export function buildPrompt(params: {
  action: AIAction;
  code: string;
  language: string;
  userMessage: string;
  output?: string;
  stdin?: string;
  targetLanguage?: string;
}): string {
  const { action, code, language, userMessage, output, stdin, targetLanguage } = params;

  const codeBlock = `\`\`\`${language}\n${code}\n\`\`\``;
  const outputSection = output
    ? `\n\nProgram output:\n\`\`\`\n${output}\n\`\`\``
    : "";
  const stdinSection = stdin ? `\n\nStandard input: ${stdin}` : "";

  const actionInstructions: Record<AIAction, string> = {
    explain: "Explain what this code does in clear, plain English. Be concise.",
    fix: "Identify and fix any bugs in this code. Show the corrected code and explain what was wrong.",
    optimize: "Suggest concrete performance improvements for this code with reasoning.",
    translate: `Translate this code to ${targetLanguage ?? "the requested language"} while preserving the exact logic.`,
  };

  return `You are an expert software engineer helping with ${language} code.

${actionInstructions[action]}

Code (${language}):
${codeBlock}${outputSection}${stdinSection}

User request: ${userMessage}

Respond concisely and use markdown code blocks for any code.`;
}
