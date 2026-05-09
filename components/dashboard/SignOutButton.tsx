"use client";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/utils/authUtils";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const handle = async () => {
    await signOutUser();
    router.push("/landing");
  };
  return <Button variant="ghost" size="sm" onClick={handle}>Sign Out</Button>;
}
