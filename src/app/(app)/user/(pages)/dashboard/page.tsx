"use client";

import { useEffect, useState } from "react";
import { COINS, transactions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { calculateUserTotalCoinsInUSD } from "@/lib/utils";

type CoinSymbol = keyof User["coins"];

function Dashboard() {
  const user = useUserStore((state) => state.user);
  const [prices, setPrices] = useState<any>({});

  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchPrices() {
      const ids = COINS.map((c) => c.id).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url);
      const data = await res.json();
      setPrices(data);
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white">
      <div className="p-6 w-full top-16 bg-black h-24" />
      <div className="bg-black w-[98%] mx-auto -mt-24 rounded-2xl border-[1.5px] border-gray-950 border-t-[#030303]">
        <div className="py-4 px-8 flex flex-col gap-4 items-center">
          <div className="w-full flex flex-col">
            <h2 className="font-semibold">Total Balance</h2>
            <p className="text-4xl font-bold">
              ${user ? calculateUserTotalCoinsInUSD(user.coins, prices).toFixed(2) : "0.00"}
            </p>
            <>
              {!user?.kyc 
                ? (
                  <p className="text-red-500 w-full">
                    Not Verified{" "}
                    <Link
                      href="/user/kyc-form"
                      className="text-black border-2 border-gray-500 ml-2 px-3 py-1 bg-gray-200"
                    >
                      Verify Now
                    </Link>
                  </p>
                ): user?.kyc.status === "pending"
                  ? <p className="text-gray-500 w-full">Verification Pending</p>
                  : user?.kyc.status === "rejected"
                    ? (
                      <p className="text-red-500 w-full">
                        Verification Rejected{" "}
                        <Link
                          href="/user/kyc-form"
                          className="text-black border-2 border-gray-500 ml-2 px-3 py-1 bg-gray-200"
                        >
                          Reapply
                        </Link>
                      </p>
                    )
                    : <p className="text-green-500 w-full">Verified</p>
              }
            </>
            <hr className="text-white mt-2 w-full h-[4px]" />
          </div>
          <div className="w-full flex justify-between items-center relative">
            {transactions.map(({ name, image, colour, route }) => {
              return name === "Buy" || Array.isArray(image) || Array.isArray(route) ? (
                <div
                  key={name}
                  className="flex flex-col justify-center items-center"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <button
                    style={{ background: colour }}
                    className="w-12 h-12 flex justify-center items-center gap-1 rounded-[10px] mb-2"
                  >
                    <Image
                      width={16}
                      height={16}
                      color="white"
                      src={image[0]}
                      alt={name}
                      className="w-4 h-4"
                    />
                    <Image
                      width={16}
                      height={16}
                      color="white"
                      src={image[1]}
                      alt={name}
                      className="w-4 h-4"
                    />
                  </button>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: colour }}
                  >
                    {name}
                  </span>

                  {show && (
                    <div className="absolute bg-white top-18 left-0 shadow-2xl py-6 px-3 flex flex-col items-center gap-4">
                      {Array.isArray(route) && route.map(({ url, icon }) => {
                        return (
                          <Link key={url} href={url} target="_blank">
                            <Image 
                              src={icon}
                              alt="Buy"
                              width={80}
                              height={80}
                              className="w-36"
                            />
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={route}
                  key={name}
                  className="flex flex-col justify-center items-center"
                >
                  <div
                    style={{ background: colour }}
                    className="w-12 h-12 flex justify-center items-center rounded-[10px] mb-2"
                  >
                    <Image
                      width={16}
                      height={16}
                      color="white"
                      src={image}
                      alt={name}
                      className="w-4 h-4"
                    />
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: colour }}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-1 lg:px-6">
        {COINS.map((coin) => {
          const price = prices[coin.id]?.usd ?? 0;
          const change = prices[coin.id]?.usd_24h_change ?? 0;
          const changeColor =
            change > 0
              ? "text-green-500"
              : change < 0
              ? "text-red-500"
              : "text-gray-400";
          return (
            <Link target="_blank" href={coin.live_link}
              key={coin.id}
              className="bg-[#f8fafd] rounded-2xl shadow border border-[#f0f0f0] px-6 pb-6 pt-14 flex flex-col gap-2 min-h-[150px]"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={coin.icon}
                    alt={coin.symbol}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{ background: "transparent" }}
                  />
                  <div>
                    <div className="text-lg font-semibold text-black flex items-center gap-1">
                      <span style={{ color: coin.color }}>{coin.symbol}</span>
                    </div>
                    <div className="text-xs text-gray-400">{coin.name}</div>
                  </div>
                </div>

                <div>
                  <div style={{ color: coin.color }} className="text-lg font-semibold">
                    $ {price.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 5,
                    })}
                  </div>
                  <div className={`${changeColor} text-sm`}>
                    {change > 0 ? "+" : ""}
                    {change.toFixed(1)}% 24hr
                  </div>
                </div>
              </div>

              <div className="text-green-500 font-semibold text-md text-center mt-2">
                {user ? (
                  <>
                    {(user.coins[coin.symbol as CoinSymbol]).toFixed(2)}{" "}
                    <span style={{ color: coin.color }}>{coin.symbol}</span> = $
                    {(user.coins[coin.symbol as CoinSymbol] * price).toFixed(2)}
                  </>
                ) : (
                  "0.00"
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Dashboard;