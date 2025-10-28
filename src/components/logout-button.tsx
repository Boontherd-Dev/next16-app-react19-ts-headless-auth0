"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeAccessTokenCookie } from "@/lib/auth";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function LogoutButton({ 
  variant = "outline", 
  size = "sm",
  className 
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the access token cookie
    removeAccessTokenCookie();
    
    // Redirect to login page
    router.push("/login");
    router.refresh(); // Refresh to clear any cached data
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant={variant} 
      size={size}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}

