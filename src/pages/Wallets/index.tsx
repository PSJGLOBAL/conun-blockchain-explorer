import { Route, Switch, Redirect } from "react-router-dom"
import WalletPage from "../Wallets/WalletPage"

const WalletsMain = () => {
  return (
    <main className="contracts-main section-block">
      <Switch>
        <Route path="/wallets/:walletHash">
          <WalletPage />
        </Route>
        <Route path="/wallets" exact>
          <Redirect to="/error?type=no_wallet_hash" />
        </Route>
      </Switch>
    </main>
  )
}

export default WalletsMain
