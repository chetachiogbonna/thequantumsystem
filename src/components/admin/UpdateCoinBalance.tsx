"use client";

import { updateUserCoinBalanceAction } from '@/app/(app)/admin/add-balance/action';
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { TableCell } from '../ui/table';
import Loader from '../Loader';

function UpdateCoinBalanceButton({ uid }: { uid: string }) {
  const [newBalance, setNewBalance] = useState(0)

  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    if (newBalance < 0 || newBalance === 0) {
      return toast.error("New balance must be greater than zero.")
    }

    try {
      startTransition(async () => {
        await updateUserCoinBalanceAction(uid, newBalance)

        toast.success("User balance updated successfully.")

        setNewBalance(0)
      })
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occured. Please try again."
      )
    }
  }

  return (
    <>
      <TableCell className="text-gray-500">
        <input 
          type="number"
          value={newBalance}
          className="border pl-2"
          onChange={(e) => setNewBalance(e.target.valueAsNumber)}
        />
      </TableCell>
      <TableCell>
        <button
          onClick={handleClick}
          disabled={isPending}
          style={{ cursor: isPending ? "not-allowed" : "pointer" }}
          className="px-6 py-2 bg-[#3b99fb] font-semibold text-sm rounded-sm text-white"
        >
          {isPending ? <Loader /> : "Update"}
        </button>
      </TableCell>
    </>
  )
}

export default UpdateCoinBalanceButton