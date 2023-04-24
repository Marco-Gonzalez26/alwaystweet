import React from "react"
import Link from "next/link"
import { Binary } from "lucide-react"
import { useRouter } from "next/router"

import { colors } from "styles/theme"
import useUser from "hooks/useUser"
import Avatar from "components/Avatar"
export default function Sidebar({ items }) {
  const router = useRouter()
  const user = useUser()
  return (
    <>
      <aside>
        <ul>
          <Link href="/home">
            <a>
              <Binary size={30} color={colors.primary} />
            </a>
          </Link>
          {items?.map((item) => {
            return (
              <li key={item.link}>
                <Link href={item.link}>
                  <a>
                    <item.icon size={30} />
                    <span>{item.text}</span>
                  </a>
                </Link>
              </li>
            )
          })}
          <button onClick={() => router.push("/compose/alweet")}>Alweet</button>
        </ul>
        {user && (
          <div onClick={() => router.push("/profile")}>
            <Avatar withText={false} alt={user?.username} src={user?.avatar} />
            <span className="user-details">
              <strong>{user.username}</strong>
              <small>{user.email}</small>
            </span>
          </div>
        )}
      </aside>

      <style jsx>
        {`
          aside {
            background: #fff;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
          }

          ul {
            list-style: none;
            background: #fff;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          a {
            text-decoration: none;
            color: #000;
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          span {
            font-size: 1.25rem;
            font-weight: 400;
          }
          /* Alweet button */
          button {
            background: ${colors.primary};
            color: ${colors.white};
            border: none;
            width: 80%;
            padding: 0.75rem 0 0.75rem 0;
            border-radius: 9999px;
            font-size: 1.15rem;
            font-weight: 600;
            transition: all ease 0.2s;
            cursor: pointer;
          }

          button:hover {
            opacity: 0.9;
            cursor: pointer;
          }
          /* Profile */

          div {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 9999px;
            transition: all ease 0.2s;
          }
          div:hover {
            cursor: pointer;
            background: #eee;
          }
          .user-details {
            display: flex;
            flex-direction: column;
          }
          strong {
            font-size: 18px;
            font-weight: 600;
          }
          small {
            font-size: 16px;
            color: #666;
          }
        `}
      </style>
    </>
  )
}
