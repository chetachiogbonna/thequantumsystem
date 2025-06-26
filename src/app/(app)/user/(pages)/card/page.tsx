import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function CardPage() {
  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center">
      <div className="relative mb-12">
        <div className="flex items-center justify-center gap-4">
          <div className="relative transform -rotate-12 hover:rotate-0 transition-transform duration-300">
            <Image
              src="/images/card-gold.png"
              alt="QFS Gold Card"
              width={200}
              height={300}
              className="rounded-xl shadow-2xl w-[200px] h-auto"
            />
          </div>

          <div className="relative transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <Image
              src="/images/card-silver.png"
              alt="QFS Silver Card"
              width={200}
              height={300}
              className="rounded-xl shadow-2xl w-[200px] h-auto"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Card className="bg-[#635bff] p-8 border-0">
          <h2 className="text-white text-sm font-semibold mb-8">Choose Card</h2>

          <div className="flex flex-col space-y-4">
            <Link
              href="/user/card/silver"
              className="w-full text-center py-2 bg-gradient-to-br from-[#635bff] to-[#4fa8c4] text-black text-sm font-semibold border-0 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              The Quantum System SILVER
            </Link>

            <Link
              href="/user/card/gold"
              className="w-full text-center py-2 bg-gradient-to-br from-[#635bff] to-[#4fa8c4] text-black text-sm font-semibold border-0 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              The Quantum System GOLD
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
