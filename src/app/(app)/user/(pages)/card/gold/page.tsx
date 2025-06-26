import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Gold() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center pt-10 pb-20">
      <div className="mb-8">
        <Image
          src="/images/card-gold.png"
          alt="QFS NESARA Bronze Card"
          width={300}
          height={400}
          className="w-[300px] h-auto"
        />
      </div>

      <Card className="w-[99%] mx-auto bg-[#635bff] overflow-hidden border-0 shadow-xl">
        <div className="bg-[#635bff] px-6">
          <h2 className="text-white text-sm font-bold mb-6">The Quantum System GOLD CARD</h2>

          <div className="bg-white rounded-lg px-3 py-3">
            <div className="mb-2">
              <span className="text-red-600 font-bold text-xs">NOTE:</span>
            </div>

            <div className="text-red-600">
              <div className="flex items-start font-bold text-[10px]">
                <span className="mr-2">*</span>
                <span>This is the First TQS CARD, it is designed for everyone.</span>
              </div>

              <div className="flex items-start font-bold text-[10px]">
                <span className="mr-2">1.</span>
                <span>$50,000 Minimum Required on TQS account balance.</span>
              </div>

              <div className="flex items-start font-bold text-[10px]">
                <span className="mr-2">2.</span>
                <span>Fast/Regular Withdrawal Process is Guaranteed.</span>
              </div>

              <div className="flex items-start font-bold text-[10px]">
                <span className="mr-2">3.</span>
                <span>The GOLD CARD Earns you 5% of your TQS Total Balance every 10 days.</span>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/user/card/activate?card-type=gold"
          className="uppercase py-4 rounded-xl text-center bg-gradient-to-br from-[#635bff] to-[#4fa8c4] w-[99%] mx-auto"
        >
          activate card
        </Link>
      </Card>
    </div>
  )
}
