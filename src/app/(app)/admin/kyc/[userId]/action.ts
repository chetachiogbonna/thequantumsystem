"use server";

import { updateUserKycStatus } from "@/lib/actions/user"

export const updateUserKycStatusAction = async (uid: string, status: "rejected" | "approved") => {
    return await updateUserKycStatus(uid, status)
}