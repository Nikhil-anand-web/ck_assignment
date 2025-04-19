import { Button } from "@/components/ui/button";
import Main from "@/layouts/Main";
import { Package, User } from "lucide-react";
import Link from "next/link";



export default function Layout({ children }) {
    return (

  
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-100 border-r p-6">
                    <h2 className="text-xl font-semibold mb-6">My Account</h2>
                    <nav className="space-y-4">
                        <Link href="/account">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <User className="w-4 h-4" />
                                Profile
                            </Button>
                        </Link>
                        <Link href="/account/orders">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Package className="w-4 h-4" />
                                Orders
                            </Button>
                        </Link>
                    </nav>
                </aside>
                {children}

            </div>

      

    );
}
