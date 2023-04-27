import { useEffect } from "react"

import { useRouter } from "next/router"
import useUser from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
    !user && router.replace("/login")
  }, [user])

  return <></>
}
