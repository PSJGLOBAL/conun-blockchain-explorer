import { Link } from "react-router-dom"
import { getContractType } from "../../utility/functions"

import ninjaIcon from "../../style/images/extra_icons/icon_ninja_star.svg"
import defaultIcon from "../../style/images/extra_icons/icon_wibbly_arrows.svg"
import familiarIcon from "../../style/images/extra_icons/icon_i_know_this_one.svg"
import cubeCombIcon from "../../style/images/extra_icons/icon_cube_comb.svg"

import style from "./ContractIcon.module.css"

type Props = {
  serviceType: string | number | undefined
  link?: string
}

const ContractIcon = ({ serviceType, link }: Props) => {
  const spanStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  }

  let contractType = "contract missing"
  if (serviceType) {
    contractType = getContractType(serviceType.toString())
  }

  let content
  switch (contractType) {
    case "coin":
      content = (
        <span style={spanStyle}>
          <img
            src={ninjaIcon}
            data-tip={"Coin"}
            className={style.iconImg}
            alt="coin"
          />
        </span>
      )
      break
    case "drive":
      content = (
        <span style={spanStyle}>
          <img
            src={familiarIcon}
            data-tip={"Conun Drive"}
            className={style.iconImg}
            alt="drive"
          />
        </span>
      )
      break
    case "engine":
      content = (
        <span style={spanStyle}>
          <img
            src={cubeCombIcon}
            data-tip={"Conun Engine"}
            className={style.iconImg}
            alt="engine"
          />
        </span>
      )
      break
    case "basic":
      content = (
        <span style={spanStyle}>
          <img
            src={defaultIcon}
            data-tip={"Contract Deployment"}
            className={style.iconImg}
            alt="icon"
          />
        </span>
      )
      break
    default:
      content = <span style={spanStyle}>{contractType}</span>
      break
  }

  if (link) {
    return (
      <Link to={link} className={"contract-icon-link"}>
        {content}
      </Link>
    )
  }
  return <>{content}</>
}

export default ContractIcon
