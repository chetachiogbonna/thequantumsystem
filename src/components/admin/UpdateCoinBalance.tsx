"use client";

import { updateUserCoinBalanceAction } from '@/app/(app)/admin/add-balance/action';
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { TableCell } from '../ui/table';
import Loader from '../Loader';

function UpdateCoinBalanceButton({ user }: { user: User }) {
  const [type, setType] = useState("")
  const [newBalance, setNewBalance] = useState(0)

  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    if (!type) return toast.error("Please choose the type of coin to add new balance.")

    if (!Boolean(newBalance) || newBalance < 0 || newBalance === 0) {
      return toast.error("New balance must be greater than zero.")
    }
    
    try {
      startTransition(async () => {
        await updateUserCoinBalanceAction(user, type, newBalance)

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
        <select required value={type} onChange={(e) => setType(e.target.value)} className="w-[92px] border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5]">
          <option value="">Choose</option>
          <option value="BTC">Bitcoin</option>
          <option value="BNB">BNB</option>
          <option value="DOGE">DOGE</option>
          <option value="ETH">Ethereum</option>
          <option value="LTC">LTC</option>
          <option value="USDT">USDT ERC20</option>
          <option value="XLM">XLM</option>
          <option value="XRP">XRP</option>
        </select>
      </TableCell>
      <TableCell className="text-gray-500">
        <input 
          type="number"
          value={newBalance}
          className="border pl-2"
          min={1}
          onChange={(e) => setNewBalance(e.target.valueAsNumber ?? 0)}
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