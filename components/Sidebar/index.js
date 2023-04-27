import React, { useState } from "react"
import Link from "next/link"
import { Binary } from "lucide-react"
import { useRouter } from "next/router"

import { colors } from "styles/theme"
import useUser from "hooks/useUser"
import Avatar from "components/Avatar"
import Tooltip from "components/Tooltip"
import { logout } from "../../firebase/client"

export default function Sidebar({ items }) {
  const router = useRouter()
  const user = useUser()
  const [openToolTip, setOpenTooltip] = useState(false)

  const handleLogout = () => {
    logout().then(() => {
      router.push("/login")
    })
  }
  if (!user) return null

  return (
    <>
      <aside>
        <ul>
          <Link href="/home">
            <Binary size={30} color={colors.primary} />
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
        </ul>
        <button onClick={() => router.push("/compose/alweet")}>Alweet</button>
        {user && (
          <>
            {openToolTip ? (
              <Tooltip
                handleClick={handleLogout}
                setOpenTooltip={setOpenTooltip}
              />
            ) : null}
            <div onClick={handleLogout}>
              <Avatar
                withText={false}
                alt={user?.username}
                src={user?.avatar}
              />
              <span className="user-details">
                <strong>{user.username}</strong>
                <small>{user.email}</small>
              </span>
            </div>
          </>
        )}
      </aside>

      <style jsx>
        {`
          aside {
            background: #fff;
            height: 100%;
            width: 100%;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            display: none;
            border-right: 1px solid #eee

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
            display: inline-flex;
            align-items: center;
            gap: 1rem;

            padding: 10px;
            border-radius: 1rem;
            transition: all 0.2s ease;
          }
          a:hover {
            background: #eee;
          }

          li > a > span {
            font-size: 1.25rem;
            font-weight: 500;
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
            position: relative;
          }
          div:hover {
            cursor: pointer;
            background: #eee;
            color: ${colors.primary};
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
            color: ${colors.lightGray};
          }

          @media (min-width: 640px) {
            aside {
              display: flex;
            }
          }
        `}
      </style>
    </>
  )
}
