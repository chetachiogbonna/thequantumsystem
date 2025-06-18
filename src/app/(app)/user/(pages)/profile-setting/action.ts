"use server";
import { updateUserProfile } from "@/lib/actions/user";

export async function updateProfileAction(uid: string, updates: Partial<User>) {
  return await updateUserProfile(uid, updates);
}