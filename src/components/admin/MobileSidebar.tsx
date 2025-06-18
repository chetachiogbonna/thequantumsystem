"use client";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, PlusCircle, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function MobileSidebar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
            <Menu color="white" size={28} />
        </SheetTrigger>
        <SheetContent side="left" className="w-56">
            <SheetHeader className="-mt-2">
              <Image src="/logo.png" alt="App Logo" width={80} height={80} style={{ filter: "invert(1)" }} />
            </SheetHeader>
          <nav className="flex flex-col gap-4 pl-5">
            <Link href="/admin" className="font-medium">
              <SheetClose className="w-full flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200">
                <Home size={18} /> Dashboard
              </SheetClose>
            </Link>
            <Link href="/admin/tickets" className="font-medium">
              <SheetClose className="w-full flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200">
                <Ticket size={18} /> Tickets
              </SheetClose>
            </Link>
            <Link href="/admin/add-balance" className="font-medium">
              <SheetClose className="w-full flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200">
                <PlusCircle size={18} /> Add Balance
              </SheetClose>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileSidebar;