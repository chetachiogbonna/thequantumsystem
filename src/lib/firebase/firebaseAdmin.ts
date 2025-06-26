import { getApps, initializeApp, cert, App, ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore';

let app: App

const serviceAccount: ServiceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, 'base64').toString('utf-8'))

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  })
} else {
  app = getApps()[0]
}

const adminAuth = getAuth(app)
const adminDb = getFirestore(app);
export { adminAuth, adminDb };