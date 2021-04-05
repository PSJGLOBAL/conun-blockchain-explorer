import { Route, Switch } from "react-router-dom"

import ContractSection from "../../components/SmartContracts/ContractSection/ContractSection"
import WalletPage from "../../components/Wallets/WalletPage/WalletPage"

const WalletsMain = () => {
  return (
    <main className="contracts-main">
      <Switch>
        <Route path="/wallets/:walletHash">
          <WalletPage />
        </Route>
        <Route path="/wallets" exact>
          {/* Some sort of placeholder? */}
          <ContractSection />
        </Route>
      </Switch>
    </main>
  )
}

export default WalletsMain
