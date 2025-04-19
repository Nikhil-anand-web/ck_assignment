"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavBarAdmin() {
  const { data: session, status } = useSession();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered || status === "loading") return null;

  const user = session?.user;

  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
      {/* Left: Hamburger using Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="px-4 py-3 text-lg font-semibold border-b">
              Menu
            </div>
            <div className="flex-1 p-4 space-y-4">
              <Link href="/admin-panel" className="block text-sm font-medium text-gray-700 hover:text-[#0da487]">
                Dashboard
              </Link>
              <Link href="/admin-panel/orders" className="block text-sm font-medium text-gray-700 hover:text-[#0da487]">
                Orders
              </Link>
              <Link href="/admin-panel/create-product" className="block text-sm font-medium text-gray-700 hover:text-[#0da487]">
                Create Products
              </Link>
              <Link href="/admin-panel/create-category" className="block text-sm font-medium text-gray-700 hover:text-[#0da487]">
                Create Category
              </Link>
              <Link href="/admin-panel/create-varient" className="block text-sm font-medium text-gray-700 hover:text-[#0da487]">
                Create Variant
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Center: App Name */}
      <div className="text-xl font-bold text-[#0da487]">MyApp</div>

      {/* Right: Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.image || "/default-avatar.png"} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
