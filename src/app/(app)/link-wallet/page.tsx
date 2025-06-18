"use client";

import { useEffect, useState } from 'react'
import { wallets } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import WalletConnectDialog from '@/components/WalletConnectDialog';

function LinkWallet() {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isLoading) return;

    const timeoutIntervalId = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timeoutIntervalId);
  }, [isLoading])

  return (
    <section className="bg-[#070e28] w-full h-full">
      <div className="max-w-5xl mx-auto">
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-5 lg:px-32 py-5">
          <Link href="/user/dashboard" className="text-2xl font-semibold text-gray-500">
            User
          </Link>

          <Image src="/walletconnect-logo.svg" alt="wallet connect logo" width={70} height={70} />

          <div className="text-2xl font-semibold text-gray-500">Wallets</div>
        </header>

        <div className="pt-40 w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8">
          {wallets.map(({ name, icon }) => {
            return (
              <div key={name} className="flex flex-col justify-center items-center gap-1 font-semibold">
                <button className="p-5" 
                  onClick={() => {
                    setIsLoading(true)
                    setOpen(true)
                  }}
                >
                  <Image src={icon} alt={name + " logo"} width={150} height={0} className="h-auto rounded-full" />
                </button>
                <p className="text-[rgba(63,131,248)]">{name}</p>
              </div>
            )
          })}
        </div>
      </div>

      <WalletConnectDialog open={open} setOpen={setOpen} isLoading={isLoading} />
    </section>
  )
}

export default LinkWallet