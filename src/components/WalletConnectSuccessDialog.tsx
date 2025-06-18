import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from './ui/alert-dialog'
import Link from 'next/link'
import { X } from 'lucide-react'

function WalletConnectSuccessDialog({ setIsSuccess }: { setIsSuccess: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <AlertDialog open>
        <AlertDialogContent className="">
            <AlertDialogTitle className="font-semibold text-xl flex justify-between items-center">
                <div />
                WalletConnect
                <X className="cursor-pointer" onClick={() => setIsSuccess(false)} />
            </AlertDialogTitle>

            <div>
                <div className="flex flex-col justify-between items-center gap-2 border border-gray-300 rounded-sm p-6 mb-6">
                    <div className="text-lg text-center text-yellow-700 font-semibold">Wallet will be connected within the next 24 hours.</div>
                    <Link href="/user/dashboard" className="px-6 py-2 bg-[#3b99fb] font-semibold text-sm text-center rounded-sm text-white">
                        Browse To Home
                    </Link>
                </div>

                <div className="flex flex-col justify-start border border-gray-300 rounded-sm pt-2 pb-6 pl-3 ">
                <div className="font-semibold text-sm">Wallet Connect</div>
                <div className="text-sm">Easy-to-use browser extension</div>
                </div>
            </div>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default WalletConnectSuccessDialog