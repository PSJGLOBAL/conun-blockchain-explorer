import { useState, useEffect } from "react"
import { NavLink, useHistory, useLocation } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import { BlockDataBlock } from "../../components/MainPage/BlockDataBlock/BlockDataBlock"
import { PaginationMenu } from "../../components/MainPage/PaginationMenu/PaginationMenu"

import { BlockTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import { DuplicateSkeleton } from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { setBlockActivityData, setChannelStats } from "../../store/actions"

import "../../components/MainPage/InterfaceMain/InterfaceMain.css"

import { State } from "../../utility/types"

export const BlockActivitySection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  const channelStats = useSelector((state: State) => state.basic.channelStats)

  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )
  const bottomBlock = blockActivityData[9]
  const [maxBlock, setMaxBlock] = useState<number | string>(
    channelStats.latestBlock
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const fullPage = history.location.pathname === "/blocks"

  const doPseudoPaginate = (mode: string) => {
    switch (mode) {
      case "first":
        dispatch(setBlockActivityData(activeChannelHash))
        setCurrentPage(1)
        break
      case "next":
        dispatch(setBlockActivityData(activeChannelHash, bottomBlock.blocknum))
        setCurrentPage(currentPage + 1)
        break
      case "prev":
        let target = Number(bottomBlock.id)
        target += 20 // It's 20 because bottomBlock is already -10
        dispatch(setBlockActivityData(activeChannelHash, target))
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        } else {
          setCurrentPage(1)
        }
        break
      default:
        console.log("Pagination action not possible")
        break
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    if (activeChannelHash && maxBlock === undefined) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(setBlockActivityData(activeChannelHash))
      setCurrentPage(1)
    }
  }, [activeChannelHash, fullPage, maxBlock, dispatch])

  useEffect(() => {
    setMaxBlock(channelStats.latestBlock)
  }, [channelStats.latestBlock])

  // The hash cell size is flexible
  // This function sets the header size to the same as the other cells' sizes.
  function matchHashCellSize() {
    const hashCells = document.getElementsByClassName("hash-cell")
    if (hashCells.length > 1) {
      const headerCell = hashCells[0] as HTMLElement
      const topCell = hashCells[1]
      headerCell.style.width = `${topCell.clientWidth}px`
    }
  }

  useEffect(() => {
    matchHashCellSize()
  })

  window.addEventListener("resize", () => {
    matchHashCellSize()
  })

  return (
    <section
      className={fullPage ? "section-block section-full" : "section-block"}
      id="blocks"
    >
      <div className="section-title">
        <span>Recent Blocks</span>
        {fullPage && (
          <PaginationMenu
            currentPage={currentPage}
            max={maxBlock}
            doPseudoPaginate={doPseudoPaginate}
          />
        )}
      </div>
      <div className="">
        {/* HEADER */}
        <div className="data-table-row data-table-header">
          <div className="identicon-cell"> </div>
          <div className="blocknum-cell">Num.</div>
          <div className="hash-cell hiding-cell">Hash</div>
          <div className="time-cell">Time</div>
          <div className="txncount-cell">Txns</div>
        </div>
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {blockActivityData.length > 0 ? (
          blockActivityData.map((i) => (
            <BlockDataBlock key={i.blockhash} fullPage={fullPage} data={i} />
          ))
        ) : (
          <DuplicateSkeleton howMany={10}>
            <BlockTableSkeleton />
          </DuplicateSkeleton>
        )}
      </div>
      <div>
        {fullPage ? (
          <NavLink className="section-table-link hover-gradient" to={"/"}>
            Back To Home
          </NavLink>
        ) : (
          <NavLink className="section-table-link" to={"/blocks"}>
            View More Blocks
          </NavLink>
        )}
      </div>
    </section>
  )
}
