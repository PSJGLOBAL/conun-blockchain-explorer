import { NavLink } from "react-router-dom"

import { useSelector } from "react-redux"

import { BlockDataBlock } from "../../components/MainPage/BlockDataBlock/BlockDataBlock"
import { PaginationMenu } from "../../components/MainPage/PaginationMenu/PaginationMenu"

import "../../components/MainPage/InterfaceMain/InterfaceMain.css"

import { State } from "../../utility/types"

import { RouteComponentProps } from "react-router-dom"

type Props = RouteComponentProps & {
  mainpage?: true
}

export const BlockActivitySection = (props: Props) => {
  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )

  const fullPage = props.match.path === "/blocks"

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
        {fullPage && <PaginationMenu />}
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
            <NavLink className="section-table-link" to={"/"}>
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
