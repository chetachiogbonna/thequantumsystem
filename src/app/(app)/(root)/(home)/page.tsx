"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { LineChartIcon as ChartLine, User, Globe, ArrowRight } from "lucide-react"
import Image from "next/image"

function AnimatedSection({
  children,
  className = "",
  delay = 0.1,
  direction = "bottom",
  distance = "1rem",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "top" | "bottom" | "left" | "right"
  distance?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const directionOffset = {
    top: { y: `-${distance}` },
    bottom: { y: distance },
    left: { x: `-${distance}` },
    right: { x: distance },
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {
          opacity: 0,
          ...directionOffset[direction],
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-[#0f054c] via-[#0f054c] to-[#0d0d2b] text-white overflow-x-hidden font-['Rubik',sans-serif]">
      <section className="w-full bg-[url('/assets/header-assets/header-pattern1.svg')] bg-no-repeat bg-contain bg-center mt-10 mb-20 lg:mt-0 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row items-center justify-between">
            <AnimatedSection
              className="w-full lg:w-1/2 max-w-md lg:max-w-none text-center lg:text-left"
              direction="left"
              delay={0.1}
            >
              <motion.div
                className="inline-flex items-center justify-between bg-[#3c308a] rounded-full px-2 py-1 mb-10 max-w-xs"
                animate={{ scale: [1, 1.05, 0.95, 1] }}
                transition={{ duration: 1, delay: 2, repeat: 15, repeatType: "reverse" }}
              >
                <span className="bg-white text-[#0d0d2b] text-xs font-medium px-2 py-1 rounded-full">75% SAVE</span>
                <span className="text-xs ml-2">For the Black Friday weekend</span>
              </motion.div>

              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Fastest & <span className="text-[#3b9af1]">secure</span> platform to invest in{" "}
                <span className="text-[#3b9af1]">stocks</span>
              </h1>

              <p className="text-sm lg:text-lg mb-8 text-gray-300 leading-relaxed">
                Buy and sell stocks, trusted by 10M wallets with over $30 billion in transactions.
              </p>

              <a
                href="#"
                className="inline-flex items-center bg-[#3671e9] hover:bg-[#6491ee] active:scale-95 text-white px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-300"
              >
                Try for FREE
                <span className="ml-2 bg-white text-[#3671e9] rounded-full p-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </AnimatedSection>

            <AnimatedSection className="w-full lg:w-1/2 mt-12 lg:mt-0" direction="right" delay={0.1}>
              <Image
                src="/assets/header-assets/header-Illustration.svg"
                alt="Trading Illustration"
                width={520}
                height={520}
                className="w-full max-w-lg mx-auto"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <main className="w-full">
        <AnimatedSection className="w-full px-4 mb-20" direction="bottom" delay={0.1}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8">
              <div className="text-center">
                <div className="bg-[#252579] rounded-full p-5 inline-block mb-4">
                  <ChartLine className="w-8 h-8 text-[#3671e9]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">$30B</h3>
                <p className="text-sm lg:text-base text-gray-300">Digital Stocks Exchanged</p>
              </div>

              <div className="text-center">
                <div className="bg-[#252579] rounded-full p-5 inline-block mb-4">
                  <User className="w-8 h-8 text-[#3671e9]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">10M+</h3>
                <p className="text-sm lg:text-base text-gray-300">Trusted Wallets Investor</p>
              </div>

              <div className="text-center">
                <div className="bg-[#252579] rounded-full p-5 inline-block mb-4">
                  <Globe className="w-8 h-8 text-[#3671e9]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">195</h3>
                <p className="text-sm lg:text-base text-gray-300">Countries Supported</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <section className="w-full px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <AnimatedSection className="w-full lg:w-1/2 text-center lg:text-left" direction="right" delay={0.1}>
                <h2 className="text-2xl lg:text-4xl font-bold mb-6">
                  Why you should choose <span className="text-[#cae4fb]">The Quantum System</span>
                </h2>
                <p className="text-sm lg:text-lg mb-8 text-gray-300 leading-relaxed">
                  Experience the next generation stock assets platform. No financial borders, extra fees, and fake
                  reviews.
                </p>
                <a
                  href="#"
                  className="inline-block bg-[#3671e9] hover:bg-[#6491ee] active:scale-95 text-white px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-300"
                >
                  Learn More
                </a>
              </AnimatedSection>

              <AnimatedSection className="w-full lg:w-1/2" direction="left" delay={0.1}>
                <Image
                  src="/assets/why-us-section-assets/why-us-Illustration.svg"
                  alt="Why Us Illustration"
                  width={520}
                  height={520}
                  className="w-full max-w-lg mx-auto"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="w-full px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="left" delay={0.1}>
              <h2 className="text-2xl lg:text-4xl font-bold mb-6">
                Check how much you can <span className="text-[#3b9af1]">earn</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <p className="text-sm lg:text-lg mb-12 text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Let&apos;s check your hash rate to see how much you will earn today, Exercitation veniam consequat sunt
                nostrud amet.
              </p>
            </AnimatedSection>

            <AnimatedSection className="transform translate-y-12" direction="bottom" delay={0.1}>
              <div className="bg-white text-black rounded-lg p-6 lg:p-8 shadow-lg max-w-2xl mx-auto text-left">
                <h4 className="text-sm lg:text-base font-medium text-[#1181e8] mb-4">ESTIMATED 24 HOUR REVENUE:</h4>
                <p className="text-lg lg:text-xl font-bold mb-4">
                  0.055 130 59 ETH <span className="text-[#3b9af1]">($1275)</span>
                </p>
                <span className="text-xs lg:text-sm text-gray-500">
                  Revenue will change based on mining difficulty and Ethereum price.
                </span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="w-full bg-white text-black py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <AnimatedSection direction="left" delay={0.1}>
              <h2 className="text-2xl lg:text-3xl font-bold mb-12 max-w-2xl mx-auto">
                Invest With Us With Any Of Our Plans And Get High Growth Stock Assets.
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <AnimatedSection direction="bottom" delay={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:bg-[#35068c] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <Image
                    src="/assets/plan-assets/Bronze.svg"
                    alt="Bronze Plan"
                    width={300}
                    height={300}
                    className="w-32 h-32 mx-auto mb-6"
                  />
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">
                    Regular <span className="text-sm font-normal text-gray-500 group-hover:text-white">REG</span>
                  </h3>
                  <p className="text-sm lg:text-base mb-6 text-gray-600 group-hover:text-white">
                    $100-$999 <br /> with 3% ROI every 24hrs
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center bg-[#3671e9] text-white px-6 py-3 rounded-full text-sm font-medium"
                  >
                    Invest Now
                    <span className="ml-2 bg-white text-[#3671e9] rounded-full p-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="bottom" delay={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:bg-[#35068c] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <Image
                    src="/assets/plan-assets/Silver.svg"
                    alt="Silver Plan"
                    width={300}
                    height={300}
                    className="w-32 h-32 mx-auto mb-6"
                  />
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">
                    Standard <span className="text-sm font-normal text-gray-500 group-hover:text-white">STA</span>
                  </h3>
                  <p className="text-sm lg:text-base mb-6 text-gray-600 group-hover:text-white">
                    $1,000-$9,999 <br /> with 7% ROI every 24hrs
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center bg-[#3671e9] text-white px-6 py-3 rounded-full text-sm font-medium"
                  >
                    Invest Now
                    <span className="ml-2 bg-white text-[#3671e9] rounded-full p-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="bottom" delay={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:bg-[#35068c] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <Image 
                    src="/assets/plan-assets/Gold.svg" 
                    alt="Gold Plan" 
                    width={300}
                    height={300}
                    className="w-32 h-32 mx-auto mb-6" 
                  />
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">
                    Premium <span className="text-sm font-normal text-gray-500 group-hover:text-white">UNLIMITED</span>
                  </h3>
                  <p className="text-sm lg:text-base mb-6 text-gray-600 group-hover:text-white">
                    $10,000 - unlimited <br /> with 15% ROI every 24hrs
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center bg-[#3671e9] text-white px-6 py-3 rounded-full text-sm font-medium"
                  >
                    Invest Now
                    <span className="ml-2 bg-white text-[#3671e9] rounded-full p-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <AnimatedSection className="w-full px-4 -mt-12 mb-20" direction="bottom" delay={0.1}>
        <div className="max-w-4xl mx-auto">
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
