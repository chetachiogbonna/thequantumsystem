"use server";

import { getUserByEmail } from "@/lib/actions/user";

export const getUserByEmailAction = async (email: string) => {
    return await getUserByEmail(email)
}