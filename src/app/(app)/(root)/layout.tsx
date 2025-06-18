import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const rubik = Rubik({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik"
})

export const metadata: Metadata = {
  title: "The Quantum System - Investment Platform",
  description: "Invest with us and get high growth stock assets with competitive ROI rates",
}

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={rubik.className}>{children}</main>
      <Footer />
    </>
  )
}

export default RootLayout