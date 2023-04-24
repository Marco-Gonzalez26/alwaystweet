import Alweet from "components/Alweet"
import Head from "next/head"

import { getAlweet } from "../../../firebase/client"
// import { firestore } from "../../../firebase/admin"
import { useRouter } from "next/router"
import ArrowLeft from "components/Icons/ArrowLeft"

export default function AlweetPage(props) {
  const router = useRouter()
  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Head>
        <title>{props.userName && `Alweet of ${props.userName}`}</title>{" "}
      </Head>
      <header>
        <ArrowLeft onClick={() => router.push("/home")} />
        <h3>{props.userName && `Alweet of ${props.userName}`}</h3>
      </header>
      <Alweet {...props} />
      <style jsx>{`
        header {
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
        :global(svg):hover {
          pointer-events: auto;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "EMofFsrJyLNIQKxPdwzi" } }],
    fallback: "blocking"
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params
  const alweet = await getAlweet(id)

  return { props: { ...alweet } }
  // return firestore
  //   .collection("alweets")
  //   .doc(id)
  //   .get()
  //   .then((doc) => {
  //     const data = doc.data()
  //     const id = doc.id
  //     console.log({ data })
  //     const { createdAt } = data

  //     const props = {
  //       ...data,
  //       id,
  //       createdAt: +createdAt.toDate()
  //     }
  //     console.log(props)
  //     return { props }
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //     return { props: { error: true } }
  //   })
}
