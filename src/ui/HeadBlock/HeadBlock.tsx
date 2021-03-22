import "./HeadBlock.css"
import SelectChannel from "../../components/MainPage/SelectChannel/SelectChannel"
import Search from "../../components/Search/Search"

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
