"use client";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Users } from "lucide-react";

interface CollaborateButtonProps {
  roomId: string | null;
}

export function CollaborateButton({ roomId }: CollaborateButtonProps) {
  const router = useRouter();

  const startSession = () => {
    const id = nanoid(8);
    const url = `${window.location.origin}/editor?room=${id}`;
    navigator.clipboard.writeText(url);
    router.push(`/editor?room=${id}`);
    toast.success("Room link copied — share it to invite someone", { autoClose: 4000 });
  };

  return (
    <Button
      variant={roomId ? "primary" : "ghost"}
      size="sm"
      onClick={startSession}
      className="gap-1.5"
      title={roomId ? `In room: ${roomId}` : "Start collaboration session"}
    >
      <Users className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{roomId ? "Collab" : "Collaborate"}</span>
      {roomId && <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />}
    </Button>
  );
}
