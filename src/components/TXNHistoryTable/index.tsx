import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { setChannelStats } from "../../store/actions"
import axios from "../../axios/axiosinst"

import { ObjectType } from "../../utility/types"

import TransactionTable from "../TransactionTable"
import PaginationMenu from "../PaginationMenu"
import useChannelHash from "../../hooks/useChannelHash"
import { logger } from "../../utility/functions"

type Props = {
  param: string | undefined
  dataRole?: "contract" | "wallet"
}

const TXNHistoryTable = ({ param, dataRole }: Props) => {
  const activeChannelHash = useChannelHash()

  const axiosURL =
    dataRole === "wallet"
      ? `/userActivity/${activeChannelHash}/${param}`
      : `/txActivity/${activeChannelHash}?chaincode=${param}`

  const [txnData, setTxnData] = useState<Array<ObjectType> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [bottomTXN, setBottomTXN] = useState<number | string | null>(null)

  const dispatch = useDispatch()

  const getTxnData = (url: string, txFrom: string | number | null = null) => {
    if (txFrom) {
      const txQuery = dataRole === "wallet" ? "?txId" : "&txId"

      logger("Get filtered txns: ", "info", `${url}${txQuery}=${txFrom}`)
      axios.get(`${url}${txQuery}=${txFrom}`).then((response) => {
        setTxnData(response.data.row)
      })
    } else {
      axios.get(url).then((response) => {
        setTxnData(response.data.row)
      })
    }
  }

  const doPseudoPaginate = (mode: string) => {
    if (bottomTXN) {
      switch (mode) {
        case "first":
          setCurrentPage(1)
          getTxnData(axiosURL)
          break
        case "next":
          if (txnData?.length === 10) {
            //Block pagination if there are less than 10 txns in the page (i.e, you're on the last page)
            setCurrentPage(currentPage + 1)
            getTxnData(axiosURL, bottomTXN)
          }
          break
        case "prev":
          let target = Number(bottomTXN)
          target += 20 // It's 20 because bottomTXN is already -10
          getTxnData(axiosURL, target)

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
  }

  useEffect(() => {
    dispatch(setChannelStats(activeChannelHash))
  }, [activeChannelHash, param, dispatch])

  // Use axios to get this data - so it is loaded each time a contract is clicked
  useEffect(() => {
    if (activeChannelHash && param) {
      getTxnData(axiosURL)
    }
    //eslint-disable-next-line
  }, [activeChannelHash, param, axiosURL, dispatch])

  useEffect(() => {
    if (txnData && txnData.length > 0) {
      setBottomTXN(txnData[txnData.length - 1].id)
    }
  }, [txnData])
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <PaginationMenu
          doPseudoPaginate={doPseudoPaginate}
          currentPage={currentPage}
          noPrev
        />
      </div>
      <TransactionTable txnData={txnData} fullPage />
    </>
  )
}

export default TXNHistoryTable
