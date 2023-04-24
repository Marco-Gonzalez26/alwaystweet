import { firestore } from "../../../firebase/admin"

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection("alweets")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      console.log({ data })
      res.json({
        ...data,
        id,
        createdAt: +createdAt.toDate()
      })

      res.status(200)
    })
    .catch(() => {
      res.status(404).end()
    })
}
