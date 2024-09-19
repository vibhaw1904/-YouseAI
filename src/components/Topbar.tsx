"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DarkNavbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  React.useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Logo
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background text-foreground"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-3">
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={toggleDarkMode}>
                    {isDarkMode ? "Light mode" : "Dark mode"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                    Home
                  </Link>
                  <Link href="/about" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                    About
                  </Link>
                  <Link href="/services" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                    Services
                  </Link>
                  <Link href="/contact" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                    Contact
                  </Link>
                  <div className="relative mt-3">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full bg-background text-foreground"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3 justify-start" onClick={toggleDarkMode}>
                    {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                    {isDarkMode ? "Light mode" : "Dark mode"}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}