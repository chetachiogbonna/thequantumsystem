"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy } from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function ActivateCard() {
  const router = useRouter()
  const walletAddress = "GCCWXZWAAKIZTUZ7JUOKWENIJL3N25ZHOTNKO5KY73VVZUMV3W73R5H3";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    alert("Wallet address Copied")
  }

  const handleActivate = () => {
    alert("Request Submitted.")
    router.push("/user/card")
  }

  return (
    <div className="pt-16 pb-20 px-4 bg-linear-60 from-[#eae2f5] to-[#635bff] min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-6">TheQuantumSystem CARD ACTIVATION</h2>
        </div>

        <div className="mb-8">
          <ol className="space-y-4 text-xs flex flex-col justify-center items-center">
            <li className="flex">
              <span className="mr-2">1.</span>
              <span>Click and Copy the Stellar&ldquo;XLM&ldquo; Wallet Address below the &quot;QR CODE&quot;</span>
            </li>
            <li className="flex">
              <span className="mr-2">2.</span>
              <span>Make Deposit to your Tqs Generated Stellar&ldquo;XLM&ldquo; Wallet Address &quot;BELOW&quot;</span>
            </li>
          </ol>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold mb-6">SCAN QR CODE</h3>

          <div className="flex justify-center mb-6">
            <Image
              src="/qr-code.png"
              alt="Wallet Barcode"
              width={200}
              height={200}
              className="border-2 border-black w-50 h-50"
            />
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <Input
              type="text"
              value={walletAddress}
              readOnly
              className="bg-transparent border border-white/30 text-white text-xs w-64 h-8 text-center font-mono"
            />
            <Button onClick={copyToClipboard} variant="ghost" size="sm" className="p-1 h-8 w-8">
              <Copy size={16} className="text-white" />
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <ol className="space-y-4 text-sm">
            <li>
              <h4 className="text-red-400 uppercase text-xs font-semibold text-center">
                NOTE: ALL PAYMENT WILL BE ADDED TO YOUR QFS WALLET BALANCE AND ITS WITHDRAWABLE
              </h4>
            </li>
            <li className="mt-4 text-center text-xs text-white">
              Contact the support with deposit slips after making the deposit to get your card activated and issued to
              you via email.
            </li>
          </ol>
        </div>

        <div className="text-center">
          <Button
            onClick={handleActivate}
            className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-8 py-4 rounded-full text-lg uppercase tracking-wider"
          >
            Activate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActivateCard