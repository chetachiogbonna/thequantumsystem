"use client"

import type React from "react"

import { easeOut, motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef } from "react"

import type { TargetAndTransition } from "framer-motion"

type AnimationProps = {
  initial: TargetAndTransition
  animate: TargetAndTransition
  transition: TargetAndTransition["transition"]
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: easeOut },
}

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
transition: { duration: 0.5, ease: easeOut },
}

function AnimatedSection({
  children,
  animation = fadeInUp,
  className = "",
}: {
  children: React.ReactNode
  animation?: AnimationProps
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={animation.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f054c] via-[#0f054c] to-[#0d0d2b] text-white font-rubik">
      <section className="py-20 px-4 w-full">
        <div className="container mx-auto max-w-6xl w-full">
          <AnimatedSection className="text-center mb-20">
            <h1 className="text-xl font-semibold mb-8">
              About <span className="text-[#3b9af1]">TheQuantumSystem</span>
            </h1>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 w-full">
            <AnimatedSection animation={fadeInLeft}>
              <h2 className="text-2xl font-bold mb-6">
                ABOUT <span className="text-[#3b9af1]">US</span>
              </h2>
              <p className="text-xl leading-relaxed">
                We are a leading stock investment platform that provides top-tier trading services to its clients. Our
                platform offers a secure, user-friendly interface that supports a wide range of stocks. With
                cutting-edge technology and a team of experienced professionals, we strive to deliver excellent service
                and help you maximize your trading potential.
              </p>
            </AnimatedSection>

            <AnimatedSection animation={fadeInRight}>
              <div className="relative">
                <Image
                  src="/assets/aboutimage.png"
                  alt="About us illustration"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </AnimatedSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 w-full">
            <AnimatedSection animation={fadeInLeft}>
              <div className="relative">
                <Image
                  src="/assets/for-everyone.png"
                  alt="Digital assets for everyone"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animation={fadeInRight}>
              <h2 className="text-2xl font-bold mb-6">Digital stock assets for everyone, everywhere</h2>
              <p className="text-xl leading-relaxed">
                We empower you to access and manage your finances seamlessly with a diverse range of digital stock
                assets. Whether you&apos;re an experienced trader or new to the trading world, our platform offers an
                inclusive and user-friendly environment that bridges the gap between people and digital assets. Enjoy
                secure, global access to a world of financial opportunities and experience the freedom of trading
                without boundaries.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold text-[#3b9af1] mb-2">4+</h3>
                <p className="text-sm font-medium">YEARS IN THE BUSINESS</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold text-[#3b9af1] mb-2">170+</h3>
                <p className="text-sm font-medium">STOCKS</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold text-[#3b9af1] mb-2">2453+</h3>
                <p className="text-sm font-medium">ONLINE TRADE</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#3b9af1] mb-2">More Than 1000+</h3>
                <p className="text-sm font-medium">HAPPY CLIENTS</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 w-full">
            <AnimatedSection animation={fadeInLeft}>
              <div className="relative">
                <Image
                  src="/assets/smart&secure.png"
                  alt="Smart and secure trading"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animation={fadeInRight}>
              <h2 className="text-2xl font-bold mb-6">Smart & Secure Way To Invest In Stock Trading</h2>
              <p className="text-xl leading-relaxed">
                We empower you to access and manage your finances seamlessly with a diverse range of digital stock
                assets. Whether you&apos;re an experienced trader or new to the trading world, our platform offers an
                inclusive and user-friendly environment that bridges the gap between people and digital assets. Enjoy
                secure, global access to a world of financial opportunities and experience the freedom of trading
                without boundaries.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-[#1672fd] to-[#3b9af1] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-4">Invest Now</h3>
                <p className="text-sm opacity-90 font-normal">
                  Join TheQuantumSystem to get the latest news and Invest Now
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <button className="px-6 py-3 bg-white text-[#1672fd] font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
