"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { User, LogOut } from "lucide-react";
import { useState } from "react";

import userStorage from "@/store/userStore";
import { getRoleTitle } from "@/lib/roleTitleHelper";

const AdvancedStyledDropdown = ({ handleLogOut, loading, error }) => {
  const [open, setOpen] = useState(false);
  const { userRole } = userStorage();
  const title = getRoleTitle(userRole);
  const RoleTitle = ({ role, title }) => {
    const getRoleStyle = (role) => {
      switch (role) {
        case "admin":
          return "bg-primary text-white";
        case "doctor":
          return "bg-blue text-white";

        default:
          return "bg-gray-200 text-gray-800";
      }
    };

    const getRoleIcon = (role) => {
      switch (role) {
        case "admin":
          return "👑"; // Crown
        case "doctor":
          return "🛡️"; // Shield

        default:
          return "❓"; // Question mark
      }
    };

    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{getRoleIcon(role)}</span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleStyle(
            role
          )} shadow-sm`}
        >
          {title}
        </span>
      </div>
    );
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const handleLogoutClick = async () => {
    closeDropdown();

    await handleLogOut();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {" "}
      {/* Use setOpen directly */}
      <DropdownMenuTrigger className="bg-primary hover:bg-primary/90 active:bg-primary/80 p-2 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
        <User className="text-white h-5 w-5" />
      </DropdownMenuTrigger>
      <div className="hidden md:block">
        Welcome , <span className="text-primary">{userRole}</span>
      </div>
      <DropdownMenuContent className="w-72 flex flex-col space-y-3 bg-white text-text_color shadow-xl border border-dialog_inside_border_color rounded-lg overflow-hidden p-1  animate-slideDownAndFade">
        <div className="flex flex-col px-5 space-y-3">
          <RoleTitle role={userRole} title={title} />
        </div>
        <DropdownMenuSeparator className="bg-primary/10" />

       

        <div className="px-1 py-1">
          <Button
            onClick={handleLogoutClick}
            disabled={loading}
            variant="ghost"
            size="sm"
            className={`w-full text-left group justify-start bg-gray-100 hover:bg-red-500 text-red hover:text-white transition-colors duration-300 rounded-md px-3 py-2
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
                flex items-center space-x-2
              `}
          >
            <LogOut
              className={`h-4 w-4 text-red group-hover:text-white ${
                loading ? "animate-spin" : ""
              }`}
            />
            <span>{loading ? "Logging Out..." : "Logout"}</span>
          </Button>
        </div>
        {error && <p className="text-red-400 text-xs mt-1 px-3">{error}</p>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdvancedStyledDropdown;
