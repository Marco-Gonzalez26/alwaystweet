import { initializeApp, getApps } from "@firebase/app"
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  where,
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
  return signInWithPopup(auth, provider).then(mapUserFromFirebaseAuthToUser)
}

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
    .then(mapUserFromFirebaseAuthToUser)
    .catch((e) => console.log(e))
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
// export const getAlweetFromUser = async (userId) => {
//   return await
// }
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

export const listenLatestAlweets = (handleNewAlweets) => {
  const q = query(
    collection(database, "alweets"),
    orderBy("createdAt", "desc"),
    limit(20)
  )
  const snapShot = onSnapshot(q, async ({ docs }) => {
    const newAlweets = docs.map(mapAlweetFromFirebaseToAlweetObject)
    handleNewAlweets(newAlweets)
  })

  return snapShot
}

export const getAlweetsFromUser = (userId, handleUserAlweets) => {
  const q = query(
    collection(database, "alweets"),
    where("userId", "==", userId)
  )

  const snapShot = onSnapshot(q, async ({ docs }) => {
    const userAlweets = docs.map(mapAlweetFromFirebaseToAlweetObject)
    handleUserAlweets(userAlweets)
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
