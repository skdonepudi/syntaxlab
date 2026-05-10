"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/utils/authUtils";
import { User } from "@supabase/supabase-js";
import { LogOut, LayoutDashboard, Code2, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type UserMenuProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export function UserMenu({ user, setUser }: UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    toast.success("Signed out successfully");
    router.push("/editor");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="ring-1 ring-border-default w-8 h-8">
          <AvatarImage
            className="object-cover"
            src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
            alt="User avatar"
          />
          <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/snippets")}>
          <Code2 className="mr-2 h-4 w-4" />
          <span>My Snippets</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
