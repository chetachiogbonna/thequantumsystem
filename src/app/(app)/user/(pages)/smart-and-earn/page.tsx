import Link from 'next/link'
import React from 'react'

function SmartAndEarn() {
  return (
    <section className="w-full h-[75dvh] flex justify-center items-center">
      <div>
        <p className="text-5xl font-semibold mb-5 text-center">Feature Coming soon</p>
        <div className="flex justify-center items-center">
          <Link href="/user/dashboard" className="px-6 py-2 bg-[#3b99fb] font-semibold text-sm rounded-sm text-white">
            Back To Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SmartAndEarn