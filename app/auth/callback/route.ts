import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/editor";

  // Prevent open redirect — only allow relative paths
  const safePath = next.startsWith("/") ? next : "/editor";

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/landing?error=missing_code`
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/landing?error=auth_failed`
    );
  }

  const sep = safePath.includes("?") ? "&" : "?";
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SITE_URL}${safePath}${sep}signed_in=1`
  );
}
