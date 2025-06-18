"use client";

import { updateUserKycStatusAction } from '@/app/(app)/admin/kyc/[userId]/action';
import { useUserStore } from '@/lib/store/userStore';
import { cn } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner';

type KycButtonType = { 
  uid: string,
  label: string, 
  kycStatus: string, 
}

function KycButton({ uid, label, kycStatus }: KycButtonType) {
  const setUser = useUserStore((state) => state.setUser);

  const [isPending, startTransition] = useTransition()

  const updateUserKyc = async (uid: string, status: "approved" | "rejected") => {
      try {
          startTransition(async () => {
            const user = await updateUserKycStatusAction(uid, status)
            setUser(user);
          })
      } catch (error) {
          toast(
            error instanceof Error
                ? error.message
                : "An error occured while updating your kyc."
          )
      }
  }

  return kycStatus === "approved"
    ? (
      <button
        className={cn("px-4 py-2 text-white font-semibold rounded-md bg-red-700")}
        disabled={isPending}
        style={{ cursor: isPending ? "not-allowed" : "pointer" }}
        onClick={() => updateUserKyc(uid, "rejected")}
      >
        {isPending ? "Rejecting..." : "Reject"}
      </button>
    ): (
      <button
        className={cn("px-4 py-2 text-white font-semibold rounded-md", label === "Approve" ? "bg-green-700" : "bg-red-700")}
        disabled={isPending}
        style={{ cursor: isPending ? "not-allowed" : "pointer" }}
        onClick={() => updateUserKyc(uid, label === "Approve" ? "approved" : "rejected")}
      >
        {isPending
          ? (label === "Approve" && isPending) ? "Approving..." : "Rejecting..."
          : (label === "Approve" && !isPending) ? "Approve" : "Reject"
        }
      </button>
    )
}

export default KycButton