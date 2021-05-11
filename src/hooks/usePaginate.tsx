import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setChannelStats } from "../store/actions/basicActions"
import { State } from "../utility/types"
import useChannelHash from "./useChannelHash"

/*

action: pass in the action (block or txn)
max: pass in the max from channel stats
stateToWatch: pass in the part of state you want to watch

*/

function usePaginate(action: any, max: number, stateToWatch: "block" | "txn") {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [prevent, setPrevent] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])

  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )

  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  const reduxState =
    stateToWatch === "block" ? blockActivityData : txnActivityData

  const activeChannelHash = useChannelHash()
  const dispatch = useDispatch()

  const getFirstPage = () => {
    if (!prevent) {
      setData([])
      dispatch(action(activeChannelHash))
      setLoading(true)
      setPrevent(true)
    }
  }

  const getNextPage = (current: number, bottomOfCurrent: number) => {
    if (!prevent) {
      setData([])
      if (current * 10 + 10 < max) {
        dispatch(action(activeChannelHash, bottomOfCurrent))
        setPrevent(true)
        setLoading(true)
      } else if (max - current * 10 < 10) {
        dispatch(action(activeChannelHash, max - 10))
        setPrevent(true)
        setLoading(true)
        // setCurrentPage(Number(maxBlock))
      } else {
        setPrevent(true)
      }
    }
  }

  const getPrevPage = (current: number, bottomOfCurrent: number) => {
    if (!prevent) {
      setData([])
      if (current * 10 > 10) {
        dispatch(action(activeChannelHash, bottomOfCurrent + 20))
        setPrevent(true)
        setLoading(true)
      }
    }
  }

  useEffect(() => {
    if (reduxState && reduxState.length !== 0) {
      setData(reduxState)
    }
  }, [reduxState])

  useEffect(() => {
    if (data && data.length !== 0) {
      setLoading(false)
      setPrevent(false)
    }
  }, [data])

  useEffect(() => {
    if (activeChannelHash) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(action(activeChannelHash))
    }
  }, [activeChannelHash, action, dispatch])

  return {
    getFirstPage,
    getNextPage,
    getPrevPage,

    isLoading,
    prevent,
  }
}

export default usePaginate
