import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  appId: string
  messagingSenderId: string
  storageBucket: string
  measurementId?: string
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
}

const requiredKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
  'messagingSenderId',
  'storageBucket',
] as const

const missing = requiredKeys.filter((key) => !firebaseConfig[key])

export const firebaseStatus = {
  enabled: missing.length === 0,
  missing,
}

const firebaseApp = firebaseStatus.enabled
  ? getApps().length > 0
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null

export const auth = firebaseApp ? getAuth(firebaseApp) : null
export const db = firebaseApp ? getFirestore(firebaseApp) : null
export let analytics: ReturnType<typeof getAnalytics> | null = null

if (firebaseApp && firebaseConfig.measurementId) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(firebaseApp)
      }
    })
    .catch(() => {
      analytics = null
    })
}
