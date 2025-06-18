"use server";

import { arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { adminDb } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseClient";
import { parseStringify } from "../utils";

import { Client, Storage } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { deletePhoto } from "./user";

export const uploadTicketFiles = async (files: File[]): Promise<{ url: string, fileId: string }[]> => {
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

  const uploadedFileUrlsAndIds: { url: string, fileId: string }[] = [];

  for (const file of files) {
    const fileId = uuidv4();
    try {
      const response = await storage.createFile(bucketId, fileId, file);
      const fileUrl = storage.getFileView(bucketId, response.$id);
      uploadedFileUrlsAndIds.push({ url: fileUrl, fileId });
    } catch {
      throw new Error(`Upload failed for file "${file.name}"`);
    }
  }

  return uploadedFileUrlsAndIds;
}

export const createTicket = async ({
  uid,
  subject,
  priority,
  status,
  message,
  sender = "user",
  files = [],
  userEmail,
  userName
}: {
  uid: string;
  subject: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Closed";
  message: string;
  sender?: "user" | "admin";
  files?: { url: string, fileId: string }[];
  userEmail: string;
  userName: string
}) => {
  const now = new Date();
  const ticketRef = doc(collection(db, "tickets"));

  const data = {
    uid,
    ticketId: Math.floor(100000 + Math.random() * 900000).toString(),
    subject,
    priority,
    status,
    messages: [
      {
        sender,
        userEmail,
        userName,
        message,
        files,
        createdAt: now,
        updatedAt: now,
      }
    ],
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(ticketRef, data);

  revalidatePath("/user/ticket");
  revalidatePath("/admin/tickets");
}

export const getTicketIdByUidAndId = async (
  uid: string,
  id: string
) => {
  const q = query(
    collection(db, "tickets"),
    where("uid", "==", uid),
    where("ticketId", "==", id)
  );

  const snap = await getDocs(q);
  if (snap.empty) throw new Error("Ticket not found");

  const doc = snap.docs[0];
  return doc.id;
};

export const replyToTicket = async ({
  id,
  ticketId,
  message,
  sender = "user",
  files = [],
  userEmail,
  userName
}: {
  id: string;
  ticketId: string;
  message: string;
  sender?: "user" | "admin";
  files?: { url: string, fileId: string }[];
  userEmail: string;
  userName: string
}) => {
  const now = new Date();
  const reply = {
    sender,
    userEmail,
    userName,
    message,
    files,
    createdAt: now,
    updatedAt: now,
  };

  await updateDoc(doc(db, "tickets", id), {
    messages: arrayUnion(reply),
    updatedAt: now,
  });

  revalidatePath(`/user/ticket/view/${ticketId}`)
};

export async function getAllTickets() {
  try {
    const snapshot = await adminDb.collection("tickets").orderBy("createdAt", "desc").get()
    const tickets = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        uid: doc.data()?.uid,
        ticketId: doc.data()?.ticketId,
        subject: doc.data()?.subject,
        status: doc.data()?.status,
        priority: doc.data()?.priority,
        messages: doc.data()?.messages,
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      } as Ticket
    })

    return parseStringify(tickets);
  } catch (error) {
    throw error;
  }
}

export const getTicketsByUserId = async (userId: string) => {
  try {
    const ticketsRef = collection(db, "tickets");
    const q = query(ticketsRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

    const tickets = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as Ticket
    });

    return parseStringify(tickets);
  } catch (error) {
    console.error("Error fetching tickets for user:", error);
    throw error;
  }
}

export const getTicketByTicketId = async (ticketId: string): Promise<Ticket | null> => {
  try {
    const ticketsRef = collection(db, "tickets");
    const q = query(ticketsRef, where("ticketId", "==", ticketId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];

    return {
      ...(doc.data() as Ticket),
      createdAt: new Date(doc.data()?.createdAt.seconds * 1000),
      updatedAt: new Date(doc.data()?.createdAt.seconds * 1000),
    };
  } catch (error) {
    console.error("Error fetching ticket by ticketId:", error);
    throw error;
  }
}

export const closeTicket = async (uid: string, ticketId: string) => {
  try {
    const id = await getTicketIdByUidAndId(uid, ticketId);

    const ticketRef = adminDb.collection("tickets").doc(id);

    const doc = await ticketRef.get();

    if (!doc.exists) {
      throw new Error("Ticket not found");
    }

    await ticketRef.update({
      status: "Closed",
      updatedAt: new Date(),
    });

    revalidatePath(`/user/tickets/view/${ticketId}`)
    revalidatePath(`/user/ticket/view/${ticketId}`)
  } catch (error) {
    throw error
  }
}

export async function deleteTicket(ticketId: string, files: { url: string, fileId: string }[]) {
  try {
    await Promise.all([
      (async () => {
        for (const file of files) {
          await deletePhoto(file.fileId)
        }
      })(),
      adminDb.collection("tickets").doc(ticketId).delete()
    ])
    
    revalidatePath("/user/tickets")
    revalidatePath("/user/ticket")
  } catch (error) {
    throw error;
  }
}