"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserStore } from "@/lib/store/userStore";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

function Withdraw() {
  const { user } = useUserStore()

  const [cardType, setCardType] = useState("")

  const [show, setShow] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.activation) return toast.error("Card not activated. You must actvate a card before you withdaw.", { description: "Please visit the card page to activate a card." })

    const amountInput = document.getElementById("amount") as HTMLInputElement
    const amout = amountInput.valueAsNumber;

    if (amout <= 0) {
      return toast.error("Amount must be greater than zero.")
    }

    setShow(true)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full max-w-md h-min">
        <h2 className="text-lg font-semibold mb-4">Withdraw Funds</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black mb-1 text-xs font-semibold">Withdraw To TQS Card</label>
            <select
              required
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5] mb-2"
            >
              <option value="">Select Card Type</option>
              <option value="Silver Card">Silver Card</option>
              <option value="Gold Card">Gold Card</option>
            </select>

            <label className="block text-black mb-1 text-xs font-semibold">{cardType ? cardType : "Card"} number</label>
            <input
              type="number"
              required
              placeholder="Enter Card number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5] mb-2"
            />

            <label className="block text-black mb-1 text-xs font-semibold">Amount</label>
            <input
              type="number"
              id="amount"
              required
              min="0"
              placeholder="Enter amount"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5] mb-2"
            />
          </div>
          <hr />
          <div className="flex gap-4">
            <button
              type="reset"
              className="bg-[#ff4376] text-white px-6 py-2 text-sm cursor-pointer rounded-lg font-semibold hover:bg-[#e73360] transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-[#21ce99] text-white px-6 py-2 text-sm cursor-pointer rounded-lg font-semibold hover:bg-[#1bbd85] transition"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex-1 overflow-x-auto h-min">
        <h2 className="text-lg font-semibold mb-4">Withdraw History</h2>
        <div className="flex rounded-2xl mb-4">
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-bl-md rounded-tl-md transition-all duration-200 text-white font-semibold p-3">
            Copy
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-200 text-white font-semibold p-3">
            Excel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-200 text-white font-semibold p-3">
            CSV
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-br-md rounded-tr-md transition-all duration-200 text-white font-semibold p-3">
            PDF
          </button>
        </div>
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search:"
              className="border rounded px-3 py-2 w-full sm:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f5f5fa]">
                <th className="py-2 px-3 text-left font-semibold text-[#1976d2]">Date</th>
                <th className="py-2 px-3 text-left font-semibold text-[#1976d2]">Type</th>
                <th className="py-2 px-3 text-left font-semibold text-[#1976d2]">Amount</th>
                <th className="py-2 px-3 text-left font-semibold text-[#1976d2]">Transaction ID</th>
                <th className="py-2 px-3 text-left font-semibold text-[#1976d2]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
          <span className="text-xs text-gray-500">Showing 0 to 0 of 0 entries</span>
          <div>
            <button className="border px-3 py-1 rounded mr-2 text-gray-600 text-xs bg-[#f5f5fa] cursor-pointer">Previous</button>
            <button className="border px-3 py-1 rounded text-gray-600 text-xs bg-[#f5f5fa] cursor-pointer">Next</button>
          </div>
        </div>
      </div>

      {show && (
        <Dialog open={show} onOpenChange={setShow}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw!</DialogTitle>
              <DialogDescription>
                Your withdrawal is under review for admin approval. Please be patient.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="destructive" onClick={() => setShow(false)}>
                Ok
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Withdraw