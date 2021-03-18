import description from "../../../../utility/contractDescriptions.json"

const ContractTextBlock = ({ contractType }: { contractType: string }) => {
  let content = description.basic

  if (contractType === "coin") {
    content = description.coin
  } else if (contractType === "drive") {
    content = description.drive
  }

  return (
    <section className="contract-description-container">
      <div className="contract-description">{content}</div>
    </section>
  )
}

export default ContractTextBlock
