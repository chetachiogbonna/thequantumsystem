"use client";

import React, { useEffect } from 'react'
import AdminHeader from "@/components/admin/Header";
import AdminSidebar from "@/components/admin/Sidebar";
import { notFound, usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import { getCurrentUser } from '@/lib/actions/auth';
import { toast } from 'sonner';
import { isAdmin } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  const setUser = useUserStore((state) => state.setUser)
  const pathname = usePathname()

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

        if (!isAdmin(user.email)) {
          notFound()
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
  }, [router, setUser, pathname])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="p-1 pr-1 md:pr-4 md:pl-60 pt-20 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}