"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/lib/store/userStore";

export default function Header() {
  const user = useUserStore((state) => state.user);

  return (
    <header className="w-full bg-[#0f054c] z-100">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex flex-col lg:flex-row justify-center md:justify-between gap-4 items-center py-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            <span className="font-semibold text-xl  md:text-2xl text-[#3b9af1] tracking-wide drop-shadow">
              The Quantum System
            </span>
          </div>
          
          <ul className="flex items-center gap-4 md:gap-8 text-base font-medium">
            <li>
              <Link href="/" className="hover:text-[#3b9af1] text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#3b9af1] text-white transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#3b9af1] text-white transition text-nowrap">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#3b9af1] text-white transition text-nowrap">
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
              <div className="flex items-center gap-4 mt-4 md:mt-0">
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