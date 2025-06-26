"use client";

import Image from "next/image";
import MobileSidebar from "./MobileSidebar";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";

export default function AdminHeader() {
    const user = useUserStore((state) => state.user);

    return (
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-2 sm:px-6 py-4 border-b bg-black z-100">
            <Link href="/user/dashboard" className="flex items-center gap-2">
                <Image src="/logo.png" alt="App Logo" width={40} height={40} className="w-12 sm:w-12" />
                <span className="font-semibold text-sm sm:text-lg text-white capitalized">Admin {user?.userName}, Welcome 👋</span>
            </Link>

            <div className="flex items-center gap-1">
                <MobileSidebar />

                <Image
                    src="/default.png"
                    alt="Admin Avatar"
                    width={36}
                    height={36}
                    className="rounded-full border"
                />
            </div>
        </header>
    );
}