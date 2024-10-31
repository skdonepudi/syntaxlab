import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/editor";

  console.log("Callback received:");
  console.log("- Code:", code ? "exists" : "missing");
  console.log("- Next:", next);
  console.log("- Origin:", origin);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("Session exchange:", error ? "failed" : "success");

    if (!error) {
      // Simplified redirect logic
      const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${next}`;
      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    } else {
      console.error("Auth error:", error);
    }
  }

  // If we get here, something went wrong
  console.log("Redirecting to error page");
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SITE_URL}/auth/auth-code-error`
  );
}
