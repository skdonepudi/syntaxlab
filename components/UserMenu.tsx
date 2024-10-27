"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/utils/authUtils";
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export function UserMenu({ user, setUser }: UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("Signing out");
    await signOutUser();
    setUser(null);
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="ring-2 ring-slate-300 w-8 h-8">
          <AvatarImage
            className="object-cover"
            src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
            alt="User avatar"
          />
          <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
