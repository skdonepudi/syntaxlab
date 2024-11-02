import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function signOutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return null;
}
