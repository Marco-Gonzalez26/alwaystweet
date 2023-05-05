import Alweet from "components/Alweet"

import useUser from "../../hooks/useUser"
import Head from "next/head"

import { useEffect, useState } from "react"
import MobileNavbar from "components/MobileNavbar"
import { listenLatestAlweets } from "../../firebase/client"
import Header from "components/Header"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsuscribe
    if (user) {
      unsuscribe = listenLatestAlweets(setTimeline)
    }

    return () => unsuscribe && unsuscribe()
    // user && listenLatestAlweets().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Home / AlwaysTweet</title>
      </Head>
      <Header text="Home" />
      <section>
        {timeline.map((alweet, index) => {
          return (
            <Alweet
              key={alweet.id}
              userName={alweet.userName}
              avatar={alweet.avatar}
              content={alweet.content}
              id={alweet.id}
              userId={alweet.userId}
              createdAt={alweet.createdAt}
              imgs={alweet.imgs}
            />
          )
        })}
      </section>
      <MobileNavbar />

      <style jsx>
        {`
          header {
            position: sticky;
            display: flex;
            align-items: center;
            height: 49px;
            border-bottom: 1px solid #eee;
            top: 0;
            width: 100%;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
          }

          section {
            margin-top: 10px;
            height: auto;
            flex: 1;
          }

          h2 {
            font-size: 20px;
            font-weight: 800;
            padding-left: 15px;
          }
        `}
      </style>
    </>
  )
}
