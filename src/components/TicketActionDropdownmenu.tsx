"use client";

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner';
import { deleteTicket } from '@/lib/actions/ticket';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function TicketActionDropdownmenu({ ticket, currentUserId }: { ticket: Ticket, currentUserId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ticket?")) {
      return
    }

    setIsLoading(true)
    try {
      await deleteTicket(ticket.id, ticket.messages.flatMap(({ files }) => files))
      toast.error("Ticket deleted successfully.")
    } catch (error) {
      toast(
        error instanceof Error
          ? error.message
          : "An error occured."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isLoading}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="px-0">
          <Link className="w-full h-full px-2" href={pathname.startsWith("/admin") ? `/admin/tickets/view/${ticket.ticketId}` : `/user/ticket/view/${ticket.ticketId}`}>
            View Details
          </Link>
        </DropdownMenuItem>
        {ticket.uid === currentUserId
          ? (
            <DropdownMenuItem onClick={handleDelete} className="text-red-600 cursor-pointer">
              Delete Ticket
            </DropdownMenuItem>
          ): null
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TicketActionDropdownmenu