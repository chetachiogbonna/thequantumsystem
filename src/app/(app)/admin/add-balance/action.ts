"use server";

import { updateUserCoinBalance } from "@/lib/actions/user";

export const updateUserCoinBalanceAction = async (uid: string, newBalance: number) => {
  return await updateUserCoinBalance(uid, newBalance)
}