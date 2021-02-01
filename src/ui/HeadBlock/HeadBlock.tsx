import "./HeadBlock.css"
import SelectChannel from "../../components/SelectChannel/SelectChannel"

const Header = () => {
  return (
    <header>
      <h1>
        CONUN <span className="font-hilite">BLOCKCHAIN</span> EXPLORER
      </h1>
      <SelectChannel />
    </header>
  )
}

export default Header
