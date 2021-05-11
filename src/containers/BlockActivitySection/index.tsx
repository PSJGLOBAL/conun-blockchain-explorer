import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import BlockDataBlock from "../../pages/MainPage/BlockDataBlock"
import PaginationMenu from "../../components/PaginationMenu"

import TableButton from "../../components/TableButton"

import { BlockTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton"
import DuplicateSkeleton from "../../ui/Skeletos/DuplicateSkeleton"

import useChannelHash from "../../hooks/useChannelHash"

import { setBlockActivityData, setChannelStats } from "../../store/actions"

import { multiclass } from "../../utility/functions"

import { State } from "../../utility/types"

import style from "../../style/css/maintables.module.css"
import usePaginate from "../../hooks/usePaginate"

const BlockActivitySection = () => {
  const channelStats = useSelector((state: State) => state.basic.channelStats)
  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )

  const { getFirstPage, getNextPage, getPrevPage, isLoading, prevent } =
    usePaginate(setBlockActivityData, Number(channelStats.latestBlock), "block")

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxBlock, setMaxBlock] = useState<number | string>(
    channelStats.latestBlock
  )
  const bottomBlock = blockActivityData[blockActivityData?.length - 1]
  const activeChannelHash = useChannelHash()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const fullPage = history.location.pathname.startsWith("/blocks")

  const doPseudoPaginate = (mode: string) => {
    if (!prevent) {
      switch (mode) {
        case "first":
          getFirstPage()
          setCurrentPage(1)
          break

        case "next":
          if (bottomBlock.blocknum) {
            getNextPage(currentPage, Number(bottomBlock.blocknum))
            setCurrentPage(currentPage + 1)
          }
          break

        case "prev":
          if (bottomBlock.blocknum) {
            if (currentPage - 1 >= 1) {
              getPrevPage(currentPage, Number(bottomBlock.blocknum))
              setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1)
            }
          }
          break
        default:
          console.log("Pagination action not possible")
          break
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // useEffect to load the data
  useEffect(() => {
    if (activeChannelHash) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(setBlockActivityData(activeChannelHash))
    }
  }, [activeChannelHash, blockActivityData.length, dispatch])

  // useEffect to set the cap
  useEffect(() => {
    setMaxBlock(channelStats.latestBlock)
  }, [channelStats.latestBlock])

  const containerStyle = fullPage
    ? multiclass(style.fullpage, style.container)
    : multiclass(style.mainpage, style.container)

  return (
    <section
      className={fullPage ? "section-block section-full" : "section-block"}
      id="recent-blocks-table"
    >
      <div className="section-title">
        <span>Recent Blocks</span>
        {fullPage && (
          <PaginationMenu
            currentPage={currentPage}
            max={Math.floor(Number(maxBlock) / 10) || null}
            doPseudoPaginate={doPseudoPaginate}
          />
        )}
      </div>
      <div className={containerStyle}>
        <div className={style.table}>
          {!isLoading ? (
            blockActivityData.map((i) => (
              <BlockDataBlock key={i.blockhash} fullPage={fullPage} data={i} />
            ))
          ) : (
            <DuplicateSkeleton howMany={10}>
              <BlockTableSkeleton />
            </DuplicateSkeleton>
          )}
        </div>
      </div>
      <TableButton
        fullPage={fullPage}
        destination="/blocks"
        htmlID="block-table"
        altLabel="View More Blocks"
      />
    </section>
  )
}

export default BlockActivitySection
