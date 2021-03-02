import { useState, useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import { BlockDataBlock } from "../../components/MainPage/BlockDataBlock/BlockDataBlock"
import { PaginationMenu } from "../../components/MainPage/PaginationMenu/PaginationMenu"

import { setBlockActivityData } from "../../store/actions"

import "../../components/MainPage/InterfaceMain/InterfaceMain.css"

import { State } from "../../utility/types"

type Props = {
  mainpage?: true
}

export const BlockActivitySection = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  const channelStats = useSelector((state: State) => state.basic.channelStats)
  const maxBlock = channelStats.latestBlock

  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )
  const bottomBlock = blockActivityData[9]
  const dispatch = useDispatch()
  const history = useHistory()
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
  })
  return (
    <section
      className={
        fullPage
          ? "section-block table-block section-full"
          : "section-block table-block"
      }
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
      <div className="new-table-container new-block-table">
        {/* HEADER */}
        <div className="new-block-table hiding-cell"> </div>
        <div>Num.</div>
        <div>Hash</div>
        <div>Time</div>
        <div>Txns</div>
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {blockActivityData.map((i) => (
          <BlockDataBlock
            key={i.blockhash}
            fullPage={fullPage}
            data={{ ...i }}
          />
        ))}
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
