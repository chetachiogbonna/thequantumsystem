"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/lib/store/userStore";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#0f054c] z-100">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex flex-col lg:flex-row justify-center md:justify-between items-center pb-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            <span className="font-semibold text-xl  md:text-2xl text-[#3b9af1] tracking-wide drop-shadow">
              The Quantum System
            </span>
          </div>
          
          <ul className="flex items-center gap-4 md:gap-8 text-base font-medium mb-5 md:mb-0">
            <li>
              <Link href="/" className={cn("hover:text-[#3b9af1] text-white transition", pathname === "/" && "text-[#3b9af1]")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className={cn("hover:text-[#3b9af1] text-white transition", pathname === "/features" && "text-[#3b9af1]")}>
                Features
              </Link>
            </li>
            <li>
              <Link href="/about" className={cn("hover:text-[#3b9af1] text-white transition text-nowrap", pathname === "/about" && "text-[#3b9af1]")}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={cn("hover:text-[#3b9af1] text-white transition text-nowrap", pathname === "/contact" && "text-[#3b9af1]")}>
                Contact Us
              </Link>
            </li>
          </ul>
          
          {user
            ? (
              <Link href="/user/dashboard">
                <Image src="/default.png" alt="profile" width={35} height={35} />
              </Link>
            ): (
              <div className="flex items-center gap-4">
                <Link
                  href="/sign-in"
                  className="text-white text-sm border-r border-white/40 pr-4 hover:text-[#3b9af1] transition"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-[#3b9af1] to-[#1672fd] hover:from-[#1672fd] hover:to-[#3b9af1] transition px-6 py-2 rounded-full text-white text-sm font-semibold shadow"
                >
                  Register
                </Link>
              </div>
            ) 
          }
        </nav>
      </div>
    </header>
  );
}