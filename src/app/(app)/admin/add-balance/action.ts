"use server";

import { updateUserCoinBalance } from "@/lib/actions/user";

export const updateUserCoinBalanceAction = async (user: User, type: string, newBalance: number) => {
  return await updateUserCoinBalance(user, type, newBalance)
}