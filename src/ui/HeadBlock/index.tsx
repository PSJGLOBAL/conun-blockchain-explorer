import SelectChannel from "../../pages/MainPage/SelectChannel"
import Search from "../../components/Search"

const Header = () => {
  return (
    <header>
      <h1>
        CONUN <span className="font-hilite">BLOCKCHAIN</span> EXPLORER
      </h1>
      <SelectChannel />
      <Search />
    </header>
  )
}

export default Header
