import useUser from "hooks/useUser"
import React from "react"
import { colors } from "styles/theme"

export default function Sidebar({ items }) {
  const user = useUser()

  if (!user) return null

  return (
    <>
      <aside>Work in progress 😁</aside>

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
