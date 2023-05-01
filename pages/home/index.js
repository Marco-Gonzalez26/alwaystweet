import Alweet from "components/Alweet"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import useUser from "../../hooks/useUser"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { breakPoints, colors } from "styles/theme"
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
              img={alweet.img}
            />
          )
        })}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home stroke="#09f" height={32} width={32} />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search stroke="#09f" height={32} width={32} />
          </a>
        </Link>
        <Link href="/compose/alweet">
          <a>
            <Create stroke="#09f" height={32} width={32} />
          </a>
        </Link>
      </nav>

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

          nav {
            position: sticky;
            bottom: -1px;
            border-top: 1px solid #eee;
            width: 100%;
            background: #fff;
            display: flex;
            padding-bottom: 3em;
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

          nav a {
            display: flex;
            flex: 1 1 auto;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
          }

          nav a:hover {
            background: radial-gradient(#0099ff33 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }
          nav:hover > :global(svg) {
            stroke: ${colors.primary};
          }

          @media (min-width: ${breakPoints.mobile}) {
            nav {
              display: 'none',;
            }
          }
        `}
      </style>
    </>
  )
}
