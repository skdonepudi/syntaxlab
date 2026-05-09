"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export type Snippet = {
  id: string;
  user_id: string;
  title: string;
  language_id: number;
  code: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export async function getSnippet(id: string): Promise<Snippet | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Snippet;
}

export async function getUserSnippets(userId: string): Promise<Snippet[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as Snippet[];
}

export async function createSnippet(params: {
  userId: string;
  title: string;
  languageId: number;
  code: string;
  isPublic: boolean;
}): Promise<Snippet | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("snippets")
    .insert({
      user_id: params.userId,
      title: params.title,
      language_id: params.languageId,
      code: params.code,
      is_public: params.isPublic,
    })
    .select()
    .single();
  if (error) return null;
  revalidatePath("/dashboard/snippets");
  return data as Snippet;
}

export async function updateSnippet(
  id: string,
  updates: Partial<Pick<Snippet, "title" | "code" | "is_public">>
): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("snippets")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return false;
  revalidatePath("/dashboard/snippets");
  return true;
}

export async function deleteSnippet(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("snippets").delete().eq("id", id);
  if (error) return false;
  revalidatePath("/dashboard/snippets");
  return true;
}

export async function deleteAllUserSnippets(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("snippets").delete().eq("user_id", userId);
  if (error) return false;
  revalidatePath("/dashboard/snippets");
  return true;
}
