"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

type TicketConfirmationModalProps = {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  showConfirmation: boolean
}

function TicketConfirmationModal({ showConfirmation, setShowConfirmation }: TicketConfirmationModalProps) {
  const handleCloseTicket = () => {
    setShowConfirmation(false)
    // In a real app, this would make an API call to close the ticket
    console.log("Ticket closed successfully")
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