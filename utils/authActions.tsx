"use server";

import { revalidatePath } from "next/cache";
import { Provider } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
export async function signInWithOAuth(provider: Provider, next: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {

    throw error;
  }

  if (data.url) {
    return data.url;
  }

  revalidatePath("/", "layout");
}
