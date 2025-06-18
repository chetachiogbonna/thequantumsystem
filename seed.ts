"use server";

import { adminDb } from "@/lib/firebase/firebaseAdmin";
import * as admin from "firebase-admin";

const coins = {
  XLM: 0,
  XRP: 0,
  BTC: 0,
  ETH: 0,
  USDT: 0,
  DOGE: 0,
  LTC: 0,
  SHIB: 0,
};

export async function seedAllUsersCoinsAdmin() {
  const usersRef = adminDb.collection("users");

  try {
    const snapshot = await usersRef.get();

    const batch = adminDb.batch();

    snapshot.forEach((doc) => {
      const userRef = usersRef.doc(doc.id);
      batch.update(userRef, {
        coins,
        coinBalance: admin.firestore.FieldValue.delete(),
      });
    });

    await batch.commit();
    console.log("✅ All users seeded with coins and coinBalance removed.");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
}
