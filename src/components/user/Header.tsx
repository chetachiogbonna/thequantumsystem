"use client";

import Sidebar from './Sidebar'
import Logo from '../Logo'
import Image from 'next/image'
import Link from 'next/link'
import { isAdmin } from '@/lib/utils'
import { useUserStore } from '@/lib/store/userStore';
import { LanguageSelector } from '../LanguageSelector';

function Header() {
  const user = useUserStore((state) => state.user);
  
  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-black h-16 flex items-center z-100">
      <div className="w-full flex justify-between items-center">
        <Sidebar />

        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">0</span>
            <Image src="/icons/notification-icon.svg" alt="profile" width={15} height={15} />
          </div>

          {isAdmin(user?.email as string)
            ? (
              <Link href="/admin">
                <Image src="/default.png" alt="profile" width={35} height={35} />
              </Link>
            ): <Image src="/default.png" alt="profile" width={35} height={35} />
          }
        </div>
      </div>
    </header>
  )
}

export default Header