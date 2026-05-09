import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn(),
}));

import { createClient } from "@/utils/supabase/server";
import { getSnippet, getUserSnippets, createSnippet, updateSnippet, deleteSnippet } from "@/lib/snippets";

const mockFrom = (data: unknown, error: unknown = null) => ({
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue({ data, error }),
  then: undefined,
});

describe("snippets", () => {
  beforeEach(() => vi.clearAllMocks());

  it("getSnippet returns data for a valid id", async () => {
    const snippet = { id: "abc", title: "Test", code: "print(1)", language_id: 70, is_public: true };
    const client = { from: vi.fn(() => mockFrom(snippet)) };
    vi.mocked(createClient).mockResolvedValue(client as never);

    const result = await getSnippet("abc");
    expect(result).toEqual(snippet);
    expect(client.from).toHaveBeenCalledWith("snippets");
  });

  it("getSnippet returns null when not found", async () => {
    const client = { from: vi.fn(() => mockFrom(null, { code: "PGRST116" })) };
    vi.mocked(createClient).mockResolvedValue(client as never);

    const result = await getSnippet("missing");
    expect(result).toBeNull();
  });
});
