import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setChannelStats } from "../store/actions/basicActions"
import { State } from "../utility/types"
import useChannelHash from "./useChannelHash"

/*

action: pass in the action (block or txn)
max: pass in the max from channel stats
stateToWatch: pass in either blocks or txns

bottomOfCurrent is the blocknum or txn id of the data in the last cell in the array.
Get this data from the component and  pass it in.

current * 10 refers to changing the current 'page' into the number of cells (10)
that are shown on a page, so that you can calculate what the next query number should be.
It's used to tell that you're not already looking at the final page.

*/

function usePaginate(action: any, max: number, stateToWatch: "block" | "txn") {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [prevent, setPrevent] = useState<boolean>(false)

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
      dispatch(action(activeChannelHash))
      setLoading(true)
      setPrevent(true)
    }
  }

  const getNextPage = (current: number, bottomOfCurrent: number) => {
    if (!prevent) {
      if (current * 10 + 10 < max) {
        // If you're not on the final page, function normally.
        dispatch(action(activeChannelHash, bottomOfCurrent))
        setPrevent(true)
        setLoading(true)
      } else if (max - current * 10 < 10) {
        // If you're within the final page, but the number isn't 10,
        // Get the correct query number to show the final 10 items.
        dispatch(action(activeChannelHash, max - 10))
        setPrevent(true)
        setLoading(true)
      } else {
        //Block action
        setPrevent(true)
      }
    }
  }

  const getPrevPage = (current: number, bottomOfCurrent: number) => {
    if (!prevent) {
      if (current * 10 > 10) {
        // Basically if there are more than 10 items before the current top item
        dispatch(action(activeChannelHash, bottomOfCurrent + 20))
        // 20 =  10 for current page + 10 to get to  top of previous page
        setPrevent(true)
        setLoading(true)
      } else {
        // Go straight to the first page.
        dispatch(action(activeChannelHash))
        setPrevent(true)
        setLoading(true)
      }
    }
  }

  // If the state returned with items, unlock actions
  // I forsee an issue where it locks if there are no transactions at all.
  // It might not make a difference if there really aren't any transactions.

  useEffect(() => {
    if (reduxState && reduxState.length !== 0) {
      setLoading(false)
      setPrevent(false)
    }
  }, [reduxState])

  // Because activeChannelHash is fairly constant, this can be relied on
  // to only fire on initial loading only.
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
