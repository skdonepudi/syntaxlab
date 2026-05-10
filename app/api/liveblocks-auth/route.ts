import { Liveblocks } from "@liveblocks/node";
import { createClient } from "@/utils/supabase/server";

const PRESENCE_COLORS = [
  "#58a6ff", "#3fb950", "#d2a8ff", "#f78166",
  "#ffa657", "#79c0ff", "#a5d6ff", "#56d364",
];

function randomColor() {
  return PRESENCE_COLORS[Math.floor(Math.random() * PRESENCE_COLORS.length)];
}

export async function POST() {
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return new Response(JSON.stringify({ error: "LIVEBLOCKS_SECRET_KEY not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET_KEY });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { status, body } = await liveblocks.identifyUser(
    user?.id ?? `guest-${Math.random().toString(36).slice(2)}`,
    {
      userInfo: {
        name: user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Guest",
        color: randomColor(),
        avatar: user?.user_metadata?.avatar_url ?? null,
      },
    }
  );

  return new Response(body, { status });
}
