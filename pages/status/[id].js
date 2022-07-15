import Alweet from "components/Alweet"
// import { firestore } from "../../firebase/admin"
import { useRouter } from "next/router"
import ArrowLeft from "components/Icons/ArrowLeft"

export default function AlweetPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  return (
    <>
      <div className="header">
        <ArrowLeft onClick={() => router.push("/home")} />
        <h3>{props.userName && `Alweet of ${props.userName}`}</h3>
      </div>
      <Alweet {...props}></Alweet>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: flex-start;
          height: 55px;
          align-items: center;
          border-bottom: 2px solid #eee;
          margin: 5px;
        }

        h3 {
          font-size: 25px;
        }

        :global:hover(svg) {
          pointer-events: auto;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "9blLSW23HTDyhLg1o0fj" } }],
//     fallback: true
//   }
// }

// export async function getStaticProps(context) {
//   //  params, req, res, query
//   const { params } = context
//   const { id } = params

//   return firestore
//     .collection("alweets")
//     .doc(id)
//     .get()
//     .then((doc) => {
//       const data = doc.data()
//       const id = doc.id
//       const { createdAt } = data

//       const props = {
//         ...data,
//         id,
//         createdAt: +createdAt.toDate()
//       }
//       return { props }
//     })
//     .catch(() => {
//       return { props: {} }
//     })
// }

export async function getServerSideProps(context) {
  //  params, req, res, query
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(
    `http://localhost:3000/api/alweets/${id}`
  ).then((apiResponse) => {
    if (apiResponse.ok) {
      const props = apiResponse.json()
      return { props }
    }
    if (res) {
      res.writeHead(301, { location: "/home" }).end()
    }
  })
  return apiResponse
}
