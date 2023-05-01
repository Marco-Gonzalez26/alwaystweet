import Create from "components/Icons/Create"
import { Search, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { breakPoints, colors } from "styles/theme"

function MobileNavbar() {
  const [touchDevice, setTouchDevice] = useState(false)

  useEffect(() => {
    try {
      document.createEvent("TouchEvent")
      setTouchDevice(true)
    } catch (error) {
      setTouchDevice(false)
    }
  }, [])
  
  return (
    <>
      <nav>
        <Link href="/home">
          <a>
            <Home stroke="#09f" height={32} width={32} />
          </a>
        </Link>
        <Link href="/">
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
          nav {
            position: sticky;
            bottom: -1px;
            border-top: 1px solid #eee;
            width: 100%;
            height: auto;
            background: #fff;
            display: flex;
            padding-bottom: ${touchDevice ? "25%" : "0px"};
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
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}

export default MobileNavbar
