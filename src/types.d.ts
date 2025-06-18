type User = {
  uid: string;
  email: string;
  userName: string;
  fullName: string;
  lastName?: string;
  address?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  phone?: string;
  emailVerified: boolean;
  createdAt: string;
  kyc?: {
    url: string;
    type: string;
    uploadedAt: string;
    status: "pending" | "approved" | "rejected";
  };
  coinBalance: number
}

type WalletConnectType = "phrase" | "keystorejson" | "privatekey";

type KeystoreEntry = {
  address: string;
  password: string;
}

type Message = {
  sender: "user" | "admin";
  userEmail: string;
  userName: string;
  message: string;
  files: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type Ticket = {
  id: string;
  uid: string;
  ticketId: string
  subject: string
  status: "Open" | "Closed"
  priority: "Low" | "Medium" | "High"
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

type Timestamp = { seconds: number; nanoseconds: number }