import { initializeApp, getApps } from "@firebase/app"
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  orderBy,
  query,
  onSnapshot,
  limit
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
const apps = getApps()
const app = initializeApp(firebaseConfig)

!apps.length && initializeApp(firebaseConfig)

const database = getFirestore(app)
const auth = getAuth()
const storage = getStorage(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider).then((result) => {
    return mapUserFromFirebaseAuthToUser(result)
  })
}

export const addAlweet = async ({ content, avatar, userId, img, userName }) => {
  return await addDoc(collection(database, "alweets"), {
    avatar,
    userId,
    userName,
    content,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
    img
  })
}

const mapAlweetFromFirebaseToAlweetObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate()
  }
}

export const listenLatestAlweets = (handeNewAlweets) => {
  const q = query(
    collection(database, "alweets"),
    orderBy("createdAt", "desc"),
    limit(20)
  )
  const snapShot = onSnapshot(q, async ({ docs }) => {
    const newAlweets = docs.map(mapAlweetFromFirebaseToAlweetObject)
    handeNewAlweets(newAlweets)
  })

  return snapShot
}

// export const fetchLatestAlweets = async () => {
//   const q = query(collection(database, "alweets"), orderBy("createdAt", "desc"))
//   const querySnapshot = await getDocs(q)
//   const timeline = []

//   querySnapshot.forEach((doc) => {
//     const data = doc.data()
//     const id = doc.id
//     const { createdAt } = data

//     timeline.push({
//       ...data,
//       id,
//       createdAt: +createdAt.toDate()
//     })
//   })
//   return timeline
// }

export const uploadImage = (file) => {
  const imgRef = ref(storage, `images/${file.name}`)
  return uploadBytesResumable(imgRef, file)
}