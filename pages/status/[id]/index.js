import Alweet from "components/Alweet"
import { firestore } from "../../../firebase/admin"
import { useRouter } from "next/router"
import ArrowLeft from "components/Icons/ArrowLeft"

export default function AlweetPage(props) {
  const router = useRouter()
  console.log({ props })
  return (
    <>
      <div className="header">
        <ArrowLeft onClick={() => router.push("/home")} />
        <h3>{props?.userName && `Alweet of ${props?.userName}`}</h3>
      </div>
      <Alweet {...props} />

      {/* <style jsx>{`
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
      `}</style> */}
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2v6O59t32Pr9Kxt1cykC" } }],
    fallback: true
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params
  try {
    const doc = (await firestore.collection("alweets").doc(id).get()).data()

    const docId = doc.id
    const { createdAt } = doc
    return {
      props: {
        ...doc,
        id: docId,
        createdAt
      }
    }
  } catch (error) {
    return {
      props: {
        userName: "NO ENCONTRO"
      }
    }
  }
  // return await firestore
  //   .collection("alweets")
  //   .doc(id)
  //   .get()
  //   .then((doc) => {
  //     const data = doc.data()

  //     const id = doc.id
  //     const { createdAt } = data

  //     const props = {
  //       ...data,
  //       id,
  //       createdAt: +createdAt.toDate()
  //     }
  //     return { props }
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //     console.log("entra aqui??")
  //     return { props: {} }
  //   })
}

// export async function getServerSideProps(context) {
//   //  params, req, res, query
//   const { params } = context
//   const { id } = params

//   const apiResponse = await fetch(`http://localhost:3000/api/alweets/${id}`)
//     .then((apiResponse) => {
//       if (apiResponse.ok) {
//         const props = apiResponse.json()
//         console.log({ props })
//         return { props }
//       }
//     })
//     .catch((e) => {
//       console.error(e)
//     })
//   return { props: { apiResponse } }
// }
