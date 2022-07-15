const admin = require("firebase-admin")

const serviceAccount =
  process.env.NODE_ENV === "development"
    ? require("./firebase-keys-dev.json")
    : JSON.parse(process.env.FIREBASE_KEYS)

!admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

export const firestore = admin.firestore()
