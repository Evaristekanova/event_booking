"use client";

import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
        >
          <GiHamburgerMenu size={20} />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Welcome back, {user?.fullName?.split(" ")[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
