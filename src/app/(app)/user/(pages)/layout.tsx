"use client";

import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import { getCurrentUser } from '@/lib/actions/auth';
import { useUserStore } from '@/lib/store/userStore';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser)

  const pathname = usePathname()
  const isdashBoardpage = pathname === "/user/dashboard"
  const iscardpage = pathname.startsWith("/user/card")

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          throw new Error("No user found.")
        }

        if (!user.emailVerified) {
          return router.push("/user/authorization")
        }

        setUser(user);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An Error occured. Please log in."
        )
        return router.push("/sign-in")
      }
    }

    getUser();
  }, [router, setUser])

  return (
    <main className={cn("min-h-screen w-full pt-16 pb-20 bg-[#f5f5fa]", isdashBoardpage && "pt-10", iscardpage && "pt-10 pb-0")}>
      <Header />
      <div className={cn("max-w-7xl mx-auto py-3 md:py-6 px-2", (isdashBoardpage || iscardpage) && "max-w-full px-0")}>
        {children}
      </div>
      <Footer />
    </main>
  )
}

export default UserLayout