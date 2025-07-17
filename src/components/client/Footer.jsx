"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer  className="bg-[#d1d716] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* <div>
          <Image alt="logo" height="50" width="100" src={"https://www.elixirdigitalmedia.com/wp-content/uploads/2021/05/logo-1.png"}/>
          <p className="mt-2 text-sm">Empowering your digital presence.</p>
        </div> */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#"><Facebook className="h-5 w-5" /></a>
            <a href="#"><Twitter className="h-5 w-5" /></a>
            <a href="#"><Instagram className="h-5 w-5" /></a>
            <a href="#"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
