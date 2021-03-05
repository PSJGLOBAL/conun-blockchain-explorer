import { useEffect, useState } from "react"

import { HeadBar } from "../../ui/HeadBar/HeadBar"
import HeadBlock from "../../ui/HeadBlock/HeadBlock"

import "./Disconnected.css"

export const Disconnected = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const loadingIcon = <div className="loader">Loading...</div>
  const disconnectedMessage = (
    <div>
      Oops! It looks like your server is disconnected. Contact your system
      administrator!
    </div>
  )

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
    }, 10000)

    return () => {
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <HeadBar />
      <div className="app">
        <HeadBlock />
        <main className="disconnected">
          {loading ? loadingIcon : disconnectedMessage}
        </main>
      </div>
    </>
  )
}
