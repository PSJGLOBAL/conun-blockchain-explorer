import { useEffect, useState } from "react"

import HeadBar from "../../ui/HeadBar"
import HeadBlock from "../../ui/HeadBlock"

import style from "./Disconnected.module.css"

const Disconnected = () => {
  const [loading, setLoading] = useState<boolean>(true)

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
        <main className={style.disconnected}>
          {loading ? (
            <div className={style.loader}>Loading...</div>
          ) : (
            <div>
              Oops! It looks like your server is disconnected. Contact your
              system administrator!
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Disconnected
