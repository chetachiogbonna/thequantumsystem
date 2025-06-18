"use client"

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut",
    },
  },
}

const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut",
    },
  },
}

const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut",
    },
  },
}

const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut",
    },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <main className="w-full">
      <section className="w-full bg-white text-black py-32 flex flex-wrap justify-center items-center text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold w-4/5 max-w-lg mb-12 lg:text-3xl lg:w-full lg:mb-12"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        >
          Invest With Us With Any Of Our Plans And Get High Growth Stock Assets.
        </motion.h2>

        <motion.div
          className="w-4/5 max-w-sm md:max-w-6xl lg:max-w-7xl flex flex-wrap justify-center items-center gap-8 md:flex-nowrap"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        >
          <motion.div
            className="w-full max-w-72 flex flex-col justify-center items-center p-8 pb-4 mb-12 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#35068c] hover:text-white hover:scale-105 group"
            variants={fadeInUp}
          >
            <Image
              src="/assets/plan-assets/Bronze.svg"
              alt="Bronze Plan"
              width={150}
              height={150}
              className="mb-8"
            />
            <h3 className="text-2xl font-bold mb-5 w-full">
              Regular <span className="text-base font-normal text-gray-500 group-hover:text-white">REG</span>
            </h3>
            <p className="text-sm w-3/5 text-gray-600 group-hover:text-white mb-8">
              $100-$999 <br /> with 3% ROI every 24hrs
            </p>
            <a
              href="#"
              className="w-36 px-3 py-2 bg-[#3671e9] text-white rounded-full text-sm inline-flex items-center justify-center gap-2 my-8"
            >
              Invest Now
              <ChevronRight className="w-6 h-6 bg-white text-[#3671e9] rounded-full p-1 ml-2" />
            </a>
          </motion.div>

          <motion.div
            className="w-full max-w-72 flex flex-col justify-center items-center p-8 pb-4 mb-12 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#35068c] hover:text-white hover:scale-105 group"
            variants={fadeInUp}
          >
            <Image
              src="/assets/plan-assets/Silver.svg"
              alt="Silver Plan"
              width={150}
              height={150}
              className="mb-8"
            />
            <h3 className="text-2xl font-bold mb-5 w-full">
              Standard <span className="text-base font-normal text-gray-500 group-hover:text-white">STA</span>
            </h3>
            <p className="text-sm w-3/5 text-gray-600 group-hover:text-white mb-8">
              $1,000-$9,999 <br /> with 7% ROI every 24hrs
            </p>
            <a
              href="#"
              className="w-36 px-3 py-2 bg-[#3671e9] text-white rounded-full text-sm inline-flex items-center justify-center gap-2 my-8"
            >
              Invest Now
              <ChevronRight className="w-6 h-6 bg-white text-[#3671e9] rounded-full p-1 ml-2" />
            </a>
          </motion.div>

          <motion.div
            className="w-full max-w-72 flex flex-col justify-center items-center p-8 pb-4 mb-12 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#35068c] hover:text-white hover:scale-105 group"
            variants={fadeInUp}
          >
            <Image
              src="/assets/plan-assets/Gold.svg"
              alt="Gold Plan"
              width={150}
              height={150}
              className="mb-8"
            />
            <h3 className="text-2xl font-bold mb-5 w-full">
              Premium <span className="text-base font-normal text-gray-500 group-hover:text-white">UNLIMITED</span>
            </h3>
            <p className="text-sm w-3/5 text-gray-600 group-hover:text-white mb-8">
              $10,000 - unlimited <br /> with 15% ROI every 24hrs
            </p>
            <a
              href="#"
              className="w-36 px-3 py-2 bg-[#3671e9] text-white rounded-full text-sm inline-flex items-center justify-center gap-2 my-8"
            >
              Invest Now
              <ChevronRight className="w-6 h-6 bg-white text-[#3671e9] rounded-full p-1 ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-gradient-to-b from-[#280766] to-[#0d0d2b] py-12 flex flex-wrap justify-center items-center text-center text-white">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold w-4/5 max-w-md md:max-w-2xl lg:max-w-3xl mb-20"
          variants={fadeInDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        >
          Market sentiments, portfolio, and run the infrastructure of your choice
        </motion.h2>

        <article className="w-4/5 flex flex-wrap justify-center items-center mb-20 md:justify-between md:max-w-6xl lg:max-w-7xl lg:justify-evenly lg:mb-32">
          <motion.div
            className="w-full mb-12 flex flex-wrap justify-center items-center md:w-2/5 md:justify-start md:text-left lg:w-1/3 lg:my-10"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold w-full mb-6">Invest Smart</h3>
            <p className="text-sm md:text-lg lg:text-lg w-4/5 mb-6 md:my-6 lg:my-6">
              Get full statistic information about the behaviour of buyers and sellers will help you to make the
              decision.
            </p>
            <a
              href="#"
              className="w-36 px-3 py-2 bg-[#3671e9] text-white rounded-full text-sm hover:bg-[#6491ee] transition-all hover:scale-95 lg:py-4"
            >
              Learn More
            </a>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            className="w-full md:w-2/5"
          >
            <Image
              src="/assets/features-section-assets/features-section-invest.svg"
              alt="Crypto stats"
              width={500}
              height={400}
              className="w-full"
            />
          </motion.div>
        </article>

        <article className="w-4/5 flex flex-wrap justify-center items-center mb-20 md:justify-between md:max-w-6xl lg:max-w-7xl lg:justify-evenly lg:mb-32">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            className="md:order-first w-full md:w-2/5"
          >
            <Image
              src="/assets/features-section-assets/features-section-statistic.svg"
              alt="Detailed statistics"
              width={500}
              height={400}
              className="w-full"
            />
          </motion.div>
          <motion.div
            className="w-full mb-12 flex flex-wrap justify-center items-center md:w-2/5 md:justify-start md:text-left lg:w-1/3 lg:my-10"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold w-full mb-6">Detailed Statistics</h3>
            <p className="text-sm md:text-lg lg:text-lg w-4/5 mb-6 md:my-6 lg:my-6">
              View all mining related information in realtime, at any point at any location and decide which polls you
              want to mine in.
            </p>
            <a
              href="#"
              className="w-36 px-3 py-2 bg-[#3671e9] text-white rounded-full text-sm hover:bg-[#6491ee] transition-all hover:scale-95 lg:py-4"
            >
              Learn More
            </a>
          </motion.div>
        </article>

        <article className="w-4/5 flex flex-wrap justify-center items-center mb-20 md:justify-between md:max-w-6xl lg:max-w-7xl lg:justify-evenly">
          <motion.div
            className="w-full mb-12 flex flex-wrap justify-center items-center md:w-2/5 md:justify-start md:text-left lg:w-1/3 lg:my-10"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold w-full mb-6">
              Grow your profit and track your investments
            </h3>
            <p className="text-sm md:text-lg lg:text-lg w-4/5 mb-6 md:my-6 lg:my-6">
              Use advanced analytical tools. Clear TradingView charts let you track current and historical profit
              investments.
            </p>
            <a
              href="#"
              className="w-36 px-3 py-2 bg-[#3671e9] text-white rounded-full text-sm hover:bg-[#6491ee] transition-all hover:scale-95 lg:py-4"
            >
              Learn More
            </a>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            className="w-full md:w-1/2"
          >
            <Image
              src="/assets/features-section-assets/features-section-table.svg"
              alt="Profit graphic"
              width={500}
              height={400}
              className="w-full"
            />
          </motion.div>
        </article>
      </section>

      <motion.aside
        className="w-4/5 max-w-sm md:max-w-4xl lg:max-w-5xl bg-[#1672fd] mx-auto -mt-12 mb-20 rounded-xl flex flex-wrap justify-center items-center md:justify-between lg:justify-between"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      >
        <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden text-white">
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
      </motion.aside>
    </main>
  )
}
