import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/editor";

  console.log("Callback received:");
  console.log("- Code:", code ? "exists" : "missing");
  console.log("- Next:", next);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("Session exchange:", error ? "failed" : "success");

    if (!error) {
      console.log("Redirecting to:", next);
      return Response.redirect(next, 303);
    } else {
      console.error("Auth error:", error);
    }
  }

  return Response.redirect("/auth/auth-code-error", 303);
}
