"use server";

import { storeUserKycDocument } from "@/lib/actions/user"

export const storeUserKycDocumentAction = async (uid: string, kycType: string, kycUrl: string) => {
    return await storeUserKycDocument(uid, kycType, kycUrl);
}