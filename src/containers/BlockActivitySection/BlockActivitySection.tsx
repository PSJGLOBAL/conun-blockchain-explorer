import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"

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
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

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
        break
      case "next":
        dispatch(setBlockActivityData(activeChannelHash, bottomBlock.blocknum))
        break
      case "prev":
        let target = Number(bottomBlock.id)
        target += 20 // It's 20 because bottomBlock is already -10
        dispatch(setBlockActivityData(activeChannelHash, target))
        break
      default:
        console.log("Pagination action not possible")
        break
    }
  }

  return (
    <section
      className={
        fullPage
          ? "section section-block section-full"
          : "section section-block"
      }
    >
      <div className="section-title">
        <span>Recent Blocks</span>
        {fullPage && <PaginationMenu doPseudoPaginate={doPseudoPaginate} />}
      </div>
      <>
        <div className="info-table recent-block-header">
          <div className="table-header-cell"> </div>
          <div className="table-header-cell">Num.</div>
          <div className="table-header-cell">Hash</div>
          <div className="table-header-cell">Time</div>
          <div className="table-header-cell">Txns</div>
        </div>
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {blockActivityData.map((i) => (
          <BlockDataBlock
            key={i.blockhash}
            fullPage={fullPage}
            data={{ ...i }}
          />
        ))}
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
      </>
    </section>
  )
}
