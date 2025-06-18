"use client";

import React, { useState } from "react";

const mockTransactions = [
  {
    trx: "FAR39UG3Z4UD",
    date: "2025-06-09 04:22 PM",
    ago: "2 days ago",
    amount: "+ 5.00 USD",
    postBalance: "5.00 USD",
    walletType: "Deposit Wallet",
    detail: "You have got registration bonus",
    type: "Plus",
    remark: "Registration bonus",
  },
];

const walletTypes = ["All", "Deposit Wallet", "Interest Wallet"];
const types = ["All", "Plus", "Minus"];
const remarks = ["Any", "Balance add", "Balance subtract", "Registration bonus", "Withdraw"];

export default function Transactions() {
  const [filter, setFilter] = useState({
    trx: "",
    walletType: "All",
    type: "All",
    remark: "Any",
  });

  const filtered = mockTransactions.filter((t) =>
    (filter.trx ? t.trx.includes(filter.trx) : true) &&
    (filter.walletType === "All" ? true : t.walletType === filter.walletType) &&
    (filter.type === "All" ? true : t.type === filter.type) &&
    (filter.remark === "Any" ? true : t.remark === filter.remark)
  );

  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-end gap-4 shadow border">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-gray-400 text-sm mb-1">
            Transaction Number
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={filter.trx}
            onChange={(e) =>
              setFilter((f) => ({ ...f, trx: e.target.value }))
            }
            placeholder=""
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="block text-gray-400 text-sm mb-1">Wallet Type</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-700"
            value={filter.walletType}
            onChange={(e) =>
              setFilter((f) => ({ ...f, walletType: e.target.value }))
            }
          >
            {walletTypes.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[80px]">
          <label className="block text-gray-400 text-sm mb-1">Type</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-700"
            value={filter.type}
            onChange={(e) =>
              setFilter((f) => ({ ...f, type: e.target.value }))
            }
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="block text-gray-400 text-sm mb-1">Remark</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-700"
            value={filter.remark}
            onChange={(e) =>
              setFilter((f) => ({ ...f, remark: e.target.value }))
            }
          >
            {remarks.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button
          className="border border-black px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 font-semibold text-gray-700 px-6 py-3 border-b">
            <div>Trx</div>
            <div>Transacted</div>
            <div>Amount</div>
            <div>Post Balance</div>
            <div>Wallet Type</div>
            <div>Detail</div>
          </div>
          {filtered.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400">Data not found</div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.trx}
                className="grid grid-cols-6 items-center px-6 py-4 text-sm text-gray-500 border-b last:border-b-0"
              >
                <div className="font-medium text-[#7c7c8a]">{t.trx}</div>
                <div>
                  <div>{t.date}</div>
                  <div className="text-xs">{t.ago}</div>
                </div>
                <div className="font-bold text-[#3bb77e]">{t.amount}</div>
                <div className="font-medium">{t.postBalance}</div>
                <div>{t.walletType}</div>
                <div>{t.detail}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}