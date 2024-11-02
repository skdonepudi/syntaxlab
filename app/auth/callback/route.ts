import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/editor";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${next}`;
      return NextResponse.redirect(redirectUrl);
    } else {
      console.error("Auth error:", error);
      throw error;
    }
  }

  throw new Error("No authentication code provided");
}
