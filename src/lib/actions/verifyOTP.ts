"use server";

import { adminDb } from "../firebase/firebaseAdmin";
import { redis } from "./redis";

export async function verifyOtp({ type, email, code, uid }: { type: "otp" | "reset", email: string, code: string, uid: string }) {
    const storedCode = await redis.get(`${type}:${email}`);

    if (!storedCode) return { error: "OTP expired or not found." };
    if (String(storedCode) !== String(code)) return { error: "Incorrect OTP" };

    try {
        if (type === "otp") {
            await redis.del(`${type}:${email}`);
            const docRef = adminDb.collection("users").doc(uid);
            await docRef.update({ emailVerified: true });
            return { success: true };
        } else {
            return { success: true, successCode: storedCode }
        }
    } catch (error) {
        throw error;
    }
}
