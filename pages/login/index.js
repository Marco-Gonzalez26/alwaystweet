import { useEffect } from "react"
import { loginWithGitHub, loginWithGoogle } from "../../firebase/client"
import Head from "next/head"
import Button from "components/Icons/Button"
import GitHub from "components/Icons/Github"
import { colors } from "styles/theme"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

import Google from "components/Icons/Google"
function LoginPage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleGithubClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  const handleGoogleClick = () => {
    loginWithGoogle().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>Login / AlwaysTweet 🐦 </title>
        <meta
          name="description"
          content="Made with ❤ by always.dev (Marco Gonzalez)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <img src="/vercel.svg" alt="logo" />
        <h1>AlwaysTweet 🐦</h1>
        <h2>
          Talk about development <br />
          with developers
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <>
              <Button onClick={handleGithubClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
              <Button onClick={handleGoogleClick}>
                <Google fill="#fff" width={24} height={24} />
                Login with Google
              </Button>
            </>
          )}
          {user === USER_STATES.NOT_KNOWN && <span>Loading...</span>}
        </div>
      </section>

      <style jsx>
        {`
          img {
            width: 120px;
          }
          div {
            margin-top: 16px;
          }
          section {
            display: grid;
            place-content: center;
            height: 100%;
            text-align: center;
            place-items: center;
          }
          h1 {
            font-size: 24px;
            font-weight: 800;
            color: ${colors.primary};
            margin-bottom: 16px;
          }
          h2 {
            font-size: 18px;
            color: ${colors.secondary};
            margin-bottom: 21px;
          }
        `}
      </style>
    </>
  )
}

export default LoginPage
