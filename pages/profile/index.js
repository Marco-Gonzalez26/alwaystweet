import React, { useEffect, useState } from "react"
import Head from "next/head"

import useUser from "../../hooks/useUser"
import { getAlweetsFromUser } from "../../firebase/client"
import Alweet from "components/Alweet"
import { colors } from "styles/theme"
import Header from "components/Header"
import { useRouter } from "next/router"
import { ArrowLeft } from "lucide-react"

function ProfilePage() {
  const [userAlweets, setUserAlweets] = useState([])
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    let unsuscribe
    if (user) {
      unsuscribe = getAlweetsFromUser(user?.uid, setUserAlweets)
    }

    return () => unsuscribe && unsuscribe()
    // user && listenLatestAlweets().then(setTimeline)
  }, [user])

  return (
    <section>
      <Head>
        <title>
          {user?.username} ({user?.email}) / Alweet
        </title>
      </Head>
      {user ? (
        <>
          <Header>
            <div className="header-content">
              <button onClick={() => router.push("/")}>
                <ArrowLeft width={20}/>
              </button>
              <h2>{user?.username}</h2>
              <span>{userAlweets?.length} alweets</span>
            </div>
          </Header>
          <div className="user-profile">
            <div className="user-profile-bg"></div>
            <img
              alt={user.username}
              src={user.avatar}
              referrerPolicy="no-referrer"
            />
            <div className="divider" />
            <div className="user-details">
              <span>{user.username}</span>
              <p>{user.email}</p>
            </div>
          </div>
          {userAlweets.map((alweet, index) => {
            const firstBorder = index === 0 ? `2px solid #eee` : ""

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
                border={firstBorder}
              />
            )
          })}
        </>
      ) : (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      <style jsx>
        {`
          section {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          /*User profile*/
          .user-profile {
            width: 100%;
            background: ${colors.white};
          }

          .user-profile img {
            border: 4px solid ${colors.white};
            border-radius: 9999px;
            width: 20%;
            margin-left: 1rem;
            position: absolute;
            top: 90px;
          }

          .user-profile-bg {
            width: 100%;
            background: ${colors.primary};
            height: 150px;
          }
          .user-details {
            width: 100%;
            background: ${colors.white};
            padding: 1rem;
            height: 100px;
          }

          .user-details > span {
            font-size: 20px;
            font-weight: 700;
          }
          .user-details > p {
            font-size: 16px;
            color: #666;
          }

          .divider {
            width: 100%;
            height: 60px;
          }

          button {
            border: none;
            background: none;
            cursor: pointer;
          }

          .header-content {
            width: 100%;
            display: flex;
            align-items: center;
            height: auto;
            gap: 16px;
          }

          .header-content > span {
            color: #666;
          }
          /*Loader */
          .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ellipsis div {
            position: absolute;
            top: 33px;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #fff;
            border: solid 1px ${colors.primary};

            animation-timing-function: cubic-bezier(0, 1, 1, 0);
          }
          .lds-ellipsis div:nth-child(1) {
            left: 8px;
            animation: lds-ellipsis1 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(2) {
            left: 8px;
            animation: lds-ellipsis2 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(3) {
            left: 32px;
            animation: lds-ellipsis2 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(4) {
            left: 56px;
            animation: lds-ellipsis3 0.6s infinite;
          }
          @keyframes lds-ellipsis1 {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes lds-ellipsis3 {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(0);
            }
          }
          @keyframes lds-ellipsis2 {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(24px, 0);
            }
          }
        `}
      </style>
    </section>
  )
}

export default ProfilePage
