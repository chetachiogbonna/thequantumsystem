"use server";

import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { formatTimestampToHumanReadable, parseStringify } from "../utils";
import { auth, db } from "../firebase/firebaseClient";
import { adminAuth, adminDb } from '../firebase/firebaseAdmin'
import { getSessionCookie, setSessionCookie, clearSessionCookie } from "../firebase/session";
import { sendAdminNotification, sendOtp } from "./sendOPT";

export async function getCurrentUser(): Promise<User | null> {
  const token = await getSessionCookie();
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);

    if (!decoded || typeof decoded !== 'object' || !decoded.uid) {
      throw new Error("Invalid or malformed decoded token.")
    }

    const user = await adminAuth.getUser(decoded.uid);
    if (!user) {
      throw new Error("User not found in Firebase Auth.")
    }

    const userDocRef = adminDb.collection("users").doc(user.uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw new Error("User document not found in Firestore.")
    }

    const docData = userDoc.data() || {};

    const userData: User = {
      uid: user.uid,
      email: user.email || "",
      emailVerified: docData.emailVerified ?? false,
      userName: docData.userName ?? "",
      fullName: docData.fullName ?? "",
      lastName: docData.lastName ?? "",
      address: docData.address ?? "",
      country: docData.country ?? "",
      phone: docData.phone ?? "",
      state: docData.state ?? "",
      city: docData.city ?? "",
      zipCode: docData.zipCode ?? "",
      createdAt: docData.createdAt || new Date().toISOString(),
      kyc: docData.kyc || null,
      coins: docData.coins,
      activation: docData.activation
    };

    return parseStringify(userData);
  } catch (err) {
    throw err;
  }
}

export async function logout() {
  await clearSessionCookie()
}

export async function registerUser({
  fullName,
  email,
  userName,
  country,
  phone,
  password,
}: {
  fullName: string;
  email: string;
  userName: string;
  country: string;
  phone: string;
  password: string;
}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await userCredential.user.getIdToken();
    await setSessionCookie(idToken)

    await updateProfile(user, { displayName: userName });

    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      userName,
      country,
      phone,
      emailVerified: false,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      coins: {
        XLM: 0,
        XRP: 0,
        BTC: 0,
        ETH: 0,
        USDT: 0,
        DOGE: 0,
        LTC: 0,
        SHIB: 0,
      }
    });

    await sendOtp("otp", email, userName)
    await sendAdminNotification({ name: userName, email, createdAt: formatTimestampToHumanReadable(new Date()) })

    const userDoc = await adminDb.collection("users").doc(user.uid).get();
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: userDoc.data()?.emailVerified,
      userName: userDoc.data()?.userName,
      fullName: userDoc.data()?.fullName,
      lastName: userDoc.data()?.lastName,
      address: userDoc.data()?.address,
      country: userDoc.data()?.country,
      phone: userDoc.data()?.phone,
      state: userDoc.data()?.state,
      city: userDoc.data()?.city,
      zipCode: userDoc.data()?.zipCode,
      createdAt: userDoc.data()?.createdAt || new Date().toISOString(),
      kyc: userDoc.data()?.kyc || null,
      coins: userDoc.data()?.coins,
    } as User;

    return parseStringify(userData);

  } catch (error) {
    throw error;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await setSessionCookie(idToken)

    const userDoc = await adminDb.collection("users").doc(userCredential.user.uid).get();
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      emailVerified: userDoc.data()?.emailVerified,
      userName: userDoc.data()?.userName,
      fullName: userDoc.data()?.fullName,
      lastName: userDoc.data()?.lastName,
      address: userDoc.data()?.address,
      country: userDoc.data()?.country,
      phone: userDoc.data()?.phone,
      state: userDoc.data()?.state,
      city: userDoc.data()?.city,
      zipCode: userDoc.data()?.zipCode,
      createdAt: userDoc.data()?.createdAt || new Date().toISOString(),
      kyc: userDoc.data()?.kyc || null,
      coins: userDoc.data()?.coins
    } as User;

    return parseStringify(userData);
  } catch (error) {
    throw error;
  }
}

export const updateUserPassword = async (uid: string, newPassword: string) => {
  try {
    await adminAuth.updateUser(uid, {
      password: newPassword,
    });
  } catch (error) {
    throw error;
  }
}
