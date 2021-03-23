import description from "../../../../utility/contractDescriptions.json"
import style from "./ContractTextBlock.module.css"

const ContractTextBlock = ({ contractType }: { contractType: string }) => {
  let content = description.basic

  if (contractType === "coin") {
    content = description.coin
  } else if (contractType === "drive") {
    content = description.drive
  }

  return (
    <section className={style.container}>
      <div className={style.description}>{content}</div>
    </section>
  )
}

export default ContractTextBlock
