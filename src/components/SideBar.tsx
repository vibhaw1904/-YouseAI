"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Home, Folder, PlusCircle, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard")
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", icon: <Home className="w-4 h-4" />, route: "/" },
    { name: "Kanban", icon: <Folder className="w-4 h-4" />, route: "kanban" },
  ]

  const handleClick = (item: typeof navItems[0]) => {
    setActiveLink(item.name)
    router.push(`/${item.route}`)
  }

  return (
    <div className="h-screen w-64 bg-background border-r flex flex-col">
      <ScrollArea className="flex-grow">
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant={activeLink === item.name ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleClick(item)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button className="w-full mb-2" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
              Confirm Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Sidebar