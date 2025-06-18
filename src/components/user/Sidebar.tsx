"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { logout } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import Loader from "../Loader";
import { useState } from "react";

function Sidebar() {
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  
  const [isPending, setIsPending] = useState(false);
  
  const signUserOut = async () => {
    setIsPending(true)
    await logout();
    router.push('/sign-in');
    setIsPending(false)
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <MenuIcon color="white" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[350px] sm:w-[540px] z-500">
          <SheetHeader className="px-0 py-0">
            <SheetTitle className="mt-1 px-1 flex items-center gap-4">
              <Image src="/default.png" alt="profile" width={50} height={50} />
              <div>
                <p className="-mb-1">{user?.userName}</p>
                <p className="text-gray-300">{user?.email}</p>
              </div>
            </SheetTitle>
            <SheetDescription className="bg-black py-4 px-4 flex justify-between items-center">
              <Link className="flex flex-col justify-center items-center gap-2" href="/user/dashboard">
                <SheetClose className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <Image width={38} height={38} className="w-5 h-5" src="/icons/wallet.svg" alt="wallet" />
                  <span className="text-xs text-center">My <br /> Wallet</span>
                </SheetClose>
              </Link>

              <Link className="flex flex-col justify-center items-center gap-2" href="/user/profile-setting">
                <SheetClose className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <Image width={38} height={38} className="w-5 h-5" src="/icons/profile.svg" alt="profile" />
                  <span className="text-xs text-center">My <br /> Profile</span>
                </SheetClose>
              </Link>

              <Link className="flex flex-col justify-center items-center gap-2" href="/user/change-password">
                <SheetClose className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <Image width={38} height={38} className="w-5 h-5" src="/icons/change-password.svg" alt="change password" />
                  <span className="text-xs text-center">Change <br /> Password</span>
                </SheetClose>
              </Link>

              <Link className="flex flex-col justify-center items-center gap-2" href="/user/dashboard">
                <SheetClose className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <Image width={38} height={38} className="w-5 h-5" src="/icons/account-status.svg" alt="account status" />
                  <span className="text-xs text-center">Account <br /> Status</span>
                </SheetClose>
              </Link>
            </SheetDescription>
          </SheetHeader>

          <div className="px-6">
            <div>
              <h1 className="mb-4 font-semibold text-gray-700">Transactions</h1>

              <div className="flex flex-col gap-6">
                <Link href="/user/withdraw" className="w-full flex gap-4">
                  <SheetClose className="w-full flex gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                      <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/sender.svg" />
                    </div>

                    <div className="w-[80%] text-left">
                      <h2 className="text-[15px] mb-4">Send</h2>
                      <hr className="h-[2px] bg-black" />
                    </div>
                  </SheetClose>
                </Link>
                <Link href="/user/deposit" className="w-full flex gap-4">
                  <SheetClose className="w-full flex gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                      <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/receiver.svg" />
                    </div>

                    <div className="w-[80%] text-left">
                      <h2 className="text-[15px] mb-4">Receive</h2>
                      <hr className="h-[2px] bg-black" />
                    </div>
                  </SheetClose>
                </Link>
                <Link href="/user/ticket" className="w-full flex gap-4">
                  <SheetClose className="w-full flex gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                      <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/swap.svg" />
                    </div>

                    <div className="w-[80%] text-left">
                      <h2 className="text-[15px] mb-4">Swap</h2>
                      <hr className="h-[2px] bg-black" />
                    </div>
                  </SheetClose>
                </Link>
                <Link href="/user/transactions" className="w-full flex gap-4">
                  <SheetClose className="w-full flex gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                      <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/transaction-history.svg" />
                    </div>

                    <div className="w-[80%] text-left">
                      <h2 className="text-[15px] mb-4">Transaction History</h2>
                    </div>
                  </SheetClose>
                </Link>
              </div>

              <hr className="mt-2 h-[2px]" />
            </div>

            <div>
              <h1 className="my-4 font-semibold text-gray-700">Support</h1>

              <div className="flex flex-col gap-6">
                <Link href="/user/transactions" className="w-full flex gap-4">
                  <SheetClose className="w-full flex gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                      <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/notification-icon.svg" />
                    </div>

                    <div className="w-[80%] text-left">
                      <h2 className="text-[15px] mb-4">Notifications</h2>
                      <hr className="h-[2px] bg-black" />
                    </div>
                  </SheetClose>
                </Link>
                <Link href="/user/ticket" className="w-full flex gap-4">
                  <SheetClose className="w-full flex gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                      <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/support-icon.svg" />
                    </div>

                    <div className="w-[80%] text-left">
                      <h2 className="text-[15px] mb-4">Open Support Ticket</h2>
                    </div>
                  </SheetClose>
                </Link>
              </div>

              <hr className="mt-2 h-[2px]" />
            </div>
            
            <div>
              <h1 className="my-4 font-semibold text-gray-700">Session</h1>

              <SheetClose onClick={signUserOut} className="w-full flex gap-4 cursor-pointer">
                <div className="w-9 h-9 rounded-full flex justify-center items-center bg-black">
                  <Image width={25} height={25} alt="icon" className="w-[.875em] height-[.875em]" src="/icons/logout.svg" />
                </div>

                <div className="w-[80%] text-left">
                  <h2 className="text-[15px] text-left mt-1">Sign Out</h2>
                </div>
              </SheetClose>

              <hr className="mt-2 h-[2px]" />
            </div>

            <p className="mt-3 text-sm text-semibold text-gray-700">© The-Quantum-System</p>
          </div>
        </SheetContent>
      </Sheet>

      {isPending && (
        <div className="fixed inset-0 z-1000 bg-[rgba(0,0,0,0.8)] flex flex-col gap-2 justify-center items-center">
          <Loader />
          <div className="text-3xl text-white">Logging out...</div>
        </div>
      )}
    </>
  )
}

export default Sidebar