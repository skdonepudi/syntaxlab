import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: async (room) => {
    const res = await fetch("/api/liveblocks-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error ?? "Liveblocks auth failed");
    }
    return res.json();
  },
});

type Presence = {
  cursor: { x: number; y: number } | null;
  name: string;
  color: string;
};

type Storage = Record<string, never>;

export const {
  RoomProvider,
  useRoom,
  useOthers,
  useUpdateMyPresence,
  useSelf,
  useErrorListener,
} = createRoomContext<Presence, Storage>(client);
