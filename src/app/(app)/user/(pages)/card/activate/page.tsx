"use client";

import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Suspense } from 'react';
import Link from 'next/link';

function ActivateCardContent() {
  const searchParams = useSearchParams()
  const searchParamsValue = searchParams.get("card-type");

  if (!searchParamsValue) {
    return toast.error("URL has beeen modified. Please use the browser back button to go back")
  }

  if (searchParamsValue !== "silver" && searchParamsValue !== "gold") {
    return (
      <div className="h-screen flex justify-center items-center text-red-500">
        URL has beeen modified. Please use the browser back button to go back
      </div>
    )
  }

  return (
    <div className="pt-16 pb-20 px-4 bg-linear-60 from-[#eae2f5] to-[#635bff] min-h-[calc(100dvh-8rem)] flex items-center justify-center">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-6">TheQuantumSystem CARD ACTIVATION</h2>
        </div>

        <div className="mb-8 text-center text-sm">
          To activate your card make a deposit of {searchParamsValue === "silver" ? "$30k" : "$50k"} worth of any ISO20022 COINS XRP OR XLM, etc to activate card.
        </div>

        <div className="text-center mb-8">
          Once you make the deposit our system will detect it and activate your card automatically.
        </div>

        <div className="text-center">
          <Link href="/user/dashboard"
            className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-8 py-4 rounded-full tracking-wider"
          >
            Browse To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

const ActivateCard = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ActivateCardContent />
  </Suspense>
);

export default ActivateCard