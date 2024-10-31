import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/editor";

  console.log("Origin:", origin);
  console.log("Next path:", next);
  console.log("Forwarded host:", request.headers.get("x-forwarded-host"));
  console.log("NODE_ENV:", process.env.NODE_ENV);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      let redirectUrl;
      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`;
      } else {
        redirectUrl = `https://${forwardedHost || new URL(origin).host}${next}`;
      }

      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
