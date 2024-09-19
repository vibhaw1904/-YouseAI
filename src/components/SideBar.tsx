"use client"
import React, { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";
import { Button } from "./ui/button"; // Assuming you already have shadcn's Button component
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Projects", icon: <FiFolder /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveLink(item.name)}
                className={`w-full flex items-center p-2 rounded-lg transition-colors duration-200 ${
                  activeLink === item.name ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        {/* New Task Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
          <FiPlusCircle className="mr-2" />
          New Task
        </Button>

        {/* Logout Button */}
        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <FiLogOut className="mr-2" />
                Logout
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login  " })}>
                Confirm Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
