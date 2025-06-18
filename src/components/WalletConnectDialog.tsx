import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

function WalletConnectDialog({ open, setOpen, isLoading }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, isLoading: boolean }) {
  return open 
    ? (
      <AlertDialog open={open}>
        <AlertDialogContent className={cn("", (open && isLoading) && "h-[300px]" )}>
          {open && isLoading 
            ? ( 
              <>
                <AlertDialogTitle className="font-semibold text-lg flex justify-between items-center">
                    <div />
                    WalletConnect
                    <X className="cursor-pointer z-100" onClick={() => setOpen(false)} />
                  </AlertDialogTitle>

                  <div className="flex justify-center items-center -mt-12">
                    <Image src="/icons/loader.svg" alt="loader" width={300} height={300} />
                  </div>
              </>
            ): (
              <>
                <AlertDialogTitle className="font-semibold text-xl flex justify-between items-center">
                    <div />
                    WalletConnect
                    <X className="cursor-pointer" onClick={() => setOpen(false)} />
                </AlertDialogTitle>

                <div>
                  <div className="flex justify-between items-center border border-gray-300 rounded-sm p-6 mb-6">
                    <div className="text-xl text-red-700 font-semibold">Error Connecting...</div>
                    <Link href="/link-wallet/connect-wallet" className="px-6 py-2 bg-[#3b99fb] font-semibold text-sm rounded-sm text-white">
                      Connect Manually
                    </Link>
                  </div>

                  <div className="flex flex-col justify-start border border-gray-300 rounded-sm pt-2 pb-6 pl-3 ">
                    <div className="font-semibold text-sm">Wallet Connect</div>
                    <div className="text-sm">Easy-to-use browser extension</div>
                  </div>
                </div>
              </>
            )
          }
        </AlertDialogContent>
      </AlertDialog>
    ): null
}

export default WalletConnectDialog