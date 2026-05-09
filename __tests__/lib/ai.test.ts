import { describe, it, expect } from "vitest";
import { buildPrompt, selectModel } from "@/lib/ai";

describe("buildPrompt", () => {
  it("includes code in the prompt", () => {
    const prompt = buildPrompt({
      action: "explain",
      code: "print('hello')",
      language: "python",
      userMessage: "explain this",
    });
    expect(prompt).toContain("print('hello')");
    expect(prompt).toContain("python");
  });

  it("includes output when provided", () => {
    const prompt = buildPrompt({
      action: "fix",
      code: "print(x)",
      language: "python",
      userMessage: "fix",
      output: "NameError: name 'x' is not defined",
    });
    expect(prompt).toContain("NameError");
  });

  it("returns plain string", () => {
    const prompt = buildPrompt({ action: "explain", code: "x=1", language: "python", userMessage: "explain" });
    expect(typeof prompt).toBe("string");
  });
});

describe("selectModel", () => {
  it("returns haiku for explain", () => {
    expect(selectModel("explain")).toBe("claude-haiku-4-5-20251001");
  });
  it("returns sonnet for optimize", () => {
    expect(selectModel("optimize")).toBe("claude-sonnet-4-6");
  });
  it("returns sonnet for translate", () => {
    expect(selectModel("translate")).toBe("claude-sonnet-4-6");
  });
  it("returns haiku for fix", () => {
    expect(selectModel("fix")).toBe("claude-haiku-4-5-20251001");
  });
});
