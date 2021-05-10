import StatsBlock from "../../containers/StatsBlock"
import BlockActivitySection from "../../containers/BlockActivitySection"
import TxnActivitySection from "../../containers/TxnActivitySection"

const MainPage = () => {
  return (
    <>
      <main>
        <StatsBlock />
        <div className="splitcolumns">
          <BlockActivitySection />
          <TxnActivitySection />
        </div>
      </main>
    </>
  )
}

export default MainPage
