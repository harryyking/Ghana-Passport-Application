"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ href: string; label: string }>>([])
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/apply", label: "Apply for Passport" },
    { href: "/profile", label: "Profile" },
    { href: "/family-account", label: "Family Account" },
    { href: "/delivery-schedule", label: "Delivery Schedule" },
    { href: "/travel-advisory", label: "Travel Advisory" },
    { href: "/app-download", label: "Download Mobile App" },
    { href: "/login", label: "Logout" },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = menuItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://utfs.io/f/eqXEbyZmWEZ5P8iiKl0LCyfkmqHADbXM6QnKdWGupzhN07w2"
              alt="Ghana.GOV Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4 overflow-x-auto">
            {pathname !== "/login" && pathname !== "/register" && (
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="py-1 px-2 rounded-md text-black"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchResults.length > 0 && searchQuery && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg">
                    {searchResults.map((result, index) => (
                      <Link
                        key={index}
                        href={result.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setSearchQuery("")}
                      >
                        {result.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-[#CE1126]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {menuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

