import { activateUserCard } from "@/lib/actions/user"

export const activateUserCardAction = async (userId: string, activationType: "silver" | "gold") => {
  return await activateUserCard(userId, activationType)
}