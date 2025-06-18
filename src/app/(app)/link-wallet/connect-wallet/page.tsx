import ConnectWalletClient from "@/components/ConnectWalletClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Wallet",
  icons: {
    icon: "/interconnected.png",
  },
};

export default function ConnectWallet() {
  return <ConnectWalletClient />
}