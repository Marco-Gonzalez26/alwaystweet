import Alweet from "components/Alweet"
import { firestore } from "../../firebase/admin"
import { useRouter } from "next/router"

export default function AlweetPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  return (
    <>
      <Alweet {...props}></Alweet>
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "EGaqUCnuNUabFLDCUPFG" } }],
    fallback: true
  }
}

export async function getStaticProps(context) {
  //  params, req, res, query
  const { params } = context
  const { id } = params

  return firestore
    .collection("alweets")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate()
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(context) {
//   //  params, req, res, query
//   const { params, res } = context
//   const { id } = params

//   const apiResponse = await  fetch(`http://localhost:3000/api/alweets/${id}`).then(
//     (apiResponse) => {
//       if (apiResponse.ok) {
//         const props = apiResponse.json()
//         return {props: props}
//       }
//       if (res) {
//         res.writeHead(301, { location: "/home" }).end()
//       }
//     }
//   )
//   return apiResponse
// }
