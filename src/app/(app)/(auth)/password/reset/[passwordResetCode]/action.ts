"use server";

import { updateUserPassword } from "@/lib/actions/auth";

export const updateUserPasswordAction = async (uid: string, password: string) => {
    return await updateUserPassword(uid, password)
}