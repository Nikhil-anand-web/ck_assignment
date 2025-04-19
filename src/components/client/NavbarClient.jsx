"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, User, X, ShoppingCart, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import debounce from "@/utils/debounce";
import getQueryResult from "@/app/actions/getQueryResult";

export default function NavbarClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredResults,setFilteredResult] = useState([])

  const rtr = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const fetchResults = useCallback(
    debounce(async (searchQuery) => {

        try {
            const response = await getQueryResult(searchQuery)
            console.log(response)
            setFilteredResult(response.products)

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, 500),
    []
);
useEffect(() => {
    const helper = () => {
        fetchResults(query)
    }
    helper()
}, [query])

  

  return (
    <header className="w-full border-b shadow-sm bg-[#ffffff] sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">My App</div>

        {/* Nav links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/products/all" className="hover:text-primary transition-colors">Products</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search Toggle Button */}
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5" />
          </Button>

          {/* Cart Button */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {user?.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={user.image}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && user.role!==3 &&  <DropdownMenuItem onClick={() => rtr.push('/admin-panel')}>Admin Panel</DropdownMenuItem>}
              {user && <DropdownMenuItem onClick={() => rtr.push("/account")}>Profile</DropdownMenuItem>}
              {user ? (
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => rtr.push("/sign-in")}>Login</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hamburger Menu (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="px-6 pb-4 bg-white shadow">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {filteredResults.length > 0 && (
            <div className="mt-2 space-y-2">
              {filteredResults.map((item, idx) => (
               <Link key={item.id} href={`/product-details/${item.slug}`}> <div  className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <Image
                    src={item.thumbNail}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white">
          <Link href="/" className="block text-sm text-muted-foreground hover:text-primary">Home</Link>
          <Link href="/products" className="block text-sm text-muted-foreground hover:text-primary">Products</Link>
          <Link href="/cart" className="block text-sm text-muted-foreground hover:text-primary">Cart</Link>
        </div>
      )}
    </header>
  );
}
