import { dashBoardFooterLinks } from '@/constants'
import { logout } from '@/lib/actions/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loader from '../Loader'

function Footer() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const signUserOut = async () => {
    setIsPending(true)
    await logout();
    router.push('/sign-in');
    setIsPending(false)
  }

  return (
    <>
      <footer className="fixed left-0 right-0 bottom-0 bg-black h-16">
        <div className="flex justify-around items-center px-1 py-4">
          {dashBoardFooterLinks.map(({ label, icon, route }) => {
            return label === "logout" || !route
              ? (
                <button
                  onClick={signUserOut}
                  key={label} className="text-xs text-center text-white capitalize flex flex-col justify-center items-center">
                  <Image width={18} height={18} className="w-5 h-5 text-white" src={icon} alt="icon" />
                  <span>{label}</span>
                </button>
              ) : (
                <Link key={label} href={route} className="text-xs text-center text-white capitalize flex flex-col justify-center items-center">
                  <Image width={18} height={18} className="w-5 h-5 text-white" src={icon} alt="icon" />
                  <span>{label}</span>
                </Link>
              )
          })}
        </div>
      </footer>

      {isPending && (
        <div className="absolute inset-0 z-1000 bg-[rgba(0,0,0,0.8)] flex flex-col gap-2 justify-center items-center">
          <Loader />
          <div className="text-3xl text-white">Logging out...</div>
        </div>
      )}
    </>
  )
}

export default Footer