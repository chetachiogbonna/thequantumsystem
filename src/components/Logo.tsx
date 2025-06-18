"use client";

import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Logo({ width }: { width?: number }) {
    const pathname = usePathname()

    return (
        <Image src="/logo.png" alt="logo" width={width ?? 60} height={24} className={`${pathname === "/sign-in" || "/sign-up" ? "max-w-[70px] md:max-w-[150px]" : ""}`} />
    )
}

export default Logo