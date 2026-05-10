import { Liveblocks } from "@liveblocks/node";
import { createClient } from "@/utils/supabase/server";

const PRESENCE_COLORS = [
  "#58a6ff", "#3fb950", "#d2a8ff", "#f78166",
  "#ffa657", "#79c0ff", "#a5d6ff", "#56d364",
];

function randomColor() {
  return PRESENCE_COLORS[Math.floor(Math.random() * PRESENCE_COLORS.length)];
}

export async function POST(request: Request) {
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return new Response(JSON.stringify({ error: "LIVEBLOCKS_SECRET_KEY not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Parse the room the client is requesting access to
  const body = await request.json().catch(() => ({}));
  const roomId = typeof body?.room === "string" ? body.room : null;

  // Guests must supply a specific room ID (collab link flow)
  if (!user && !roomId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET_KEY });

  const userId = user?.id ?? `guest-${Math.random().toString(36).slice(2)}`;

  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name: user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Guest",
      color: randomColor(),
      avatar: user?.user_metadata?.avatar_url ?? null,
    },
  });

  if (user) {
    // Authenticated users can access any room
    session.allow("*", session.FULL_ACCESS);
  } else {
    // Guests are scoped to only the room they arrived with
    session.allow(roomId!, session.FULL_ACCESS);
  }

  const { status, body: responseBody } = await session.authorize();
  return new Response(responseBody, { status });
}
