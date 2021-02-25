import { useSelector } from "react-redux"

import { State } from "../../../utility/types"

const ContractsDataBlock = () => {
  const contracts = useSelector((state: State) => state.ctx.contractData)

  console.log(contracts)

  return (
    <section className="section section-block">
      {contracts?.map((ct) => (
        <div>{ct.chaincodename}</div>
      ))}
    </section>
  )
}

export default ContractsDataBlock
