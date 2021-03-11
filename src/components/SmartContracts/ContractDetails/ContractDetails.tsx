import { useParams } from "react-router-dom"

const ContractDetails = () => {
  const { contractName } = useParams<Record<string, string | undefined>>()

  return (
    <div className="section-block section-single">
      <section className="section-centered">
        <div>Imagine Contract Details Here</div>
        <div>{contractName}</div>
      </section>
    </div>
  )
}

export default ContractDetails
