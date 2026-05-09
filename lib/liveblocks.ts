import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

type Presence = {
  cursor: { x: number; y: number } | null;
  name: string;
  color: string;
};

type Storage = Record<string, never>;

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useSelf,
} = createRoomContext<Presence, Storage>(client);
