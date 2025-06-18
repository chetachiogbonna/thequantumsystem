"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { closeTicket } from '@/lib/actions/ticket';
import { useUserStore } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';

type TicketConfirmationModalProps = {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  showConfirmation: boolean,
  ticketId: string
}

function TicketConfirmationModal({ showConfirmation, setShowConfirmation, ticketId }: TicketConfirmationModalProps) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleCloseTicket = async () => {
    if (!user) {
      toast.error("Session expired.Please log in.")
      return router.push("/sign-in");
    }

    try {
      await closeTicket(user?.uid, ticketId)
      setShowConfirmation(false)
      toast.success("Ticket closed successfully.")
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unknown error."
      ) 
    }
  }

  return (
    <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation Alert!</DialogTitle>
          <DialogDescription>Are you sure to close this ticket?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setShowConfirmation(false)}>
            No
          </Button>
          <Button variant="destructive" onClick={handleCloseTicket}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TicketConfirmationModal