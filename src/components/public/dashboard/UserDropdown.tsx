import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { UserPen } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

export interface UserDropdownProps {
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    phone: string;
  };
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("client");

        // Show success toast
        toast.success("Logged out successfully");

        // Redirect to login page
        router.push("/accounts/login");
      } else {
        // Handle logout error
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };
  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user.image || "https://github.com/shadcn.png"}
            alt="User Profile"
          />
          <AvatarFallback>
            {user.name ? user.name.charAt(0).toUpperCase() : "PK"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-16">
        <DropdownMenuItem onClick={handleDashboard}>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleProfile}>
          <UserPen />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-black">
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
