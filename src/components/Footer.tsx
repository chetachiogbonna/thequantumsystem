import Link from "next/link";
import Image from "next/image";
import { FaBitcoin, FaCcMastercard, FaCcVisa } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#09091f] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-10">
        <Image
          src="/logo.png"
          alt="ChoiceStockTrade Company Logo"
          width={130}
          height={40}
          className="mb-8"
        />

        <nav className="flex flex-col justify-between md:flex-row gap-10">
          <ul>
            <li className="font-semibold text-lg mb-2">Quick Link</li>
            <li>
              <Link href="/" className="hover:text-[#92b2f3] transition block mb-1">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#92b2f3] transition block mb-1">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#92b2f3] transition block mb-1">
                Contact Us
              </Link>
            </li>
          </ul>
          <ul>
            <li className="font-semibold text-lg mb-2">Legal Resources</li>
            <li>
              <span className="block mb-1 text-white/80">FAQ</span>
            </li>
            <li>
              <span className="block mb-1 text-white/80">Terms & Policy</span>
            </li>
          </ul>
        </nav>
        
        <div className="flex flex-col justify-center items-center md:items-end">
          <h3 className="text-xl font-semibold mb-4 flex justify-center items-center md:text-right">
            We accept the following payment services
          </h3>
          <div className="gap-6 text-4xl flex  text-white">
            <FaCcVisa />
            <FaCcMastercard />
            <FaBitcoin />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 px-4">
        <p className="text-white/60 text-sm mb-8 md:mb-0">
          &copy;{new Date().getFullYear()} TheQuantumSystem. All rights reserved.
        </p>
      </div>
    </footer>
  );
}