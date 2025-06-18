import Link from "next/link";
import { Home, PlusCircle, Ticket } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-20 hidden md:flex flex-col w-56 h-full bg-white border-r pt-8 px-4">
      <nav className="flex flex-col gap-4">
        <Link href="/admin" className="flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200 w-full">
          <Home size={18} /> Dashboard
        </Link>
        <Link href="/admin/tickets" className="flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200 w-full">
          <Ticket size={18} /> Tickets
        </Link>
        <Link href="/admin/add-balance" className="flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200 w-full">
          <PlusCircle size={18} /> Add Balance
        </Link>
      </nav>
    </aside>
  );
}