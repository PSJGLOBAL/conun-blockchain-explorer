import { getContractType, logger } from "../../utility/functions"

import ninjaIcon from "../../style/images/extra_icons/icon_ninja_star.svg"
import defaultIcon from "../../style/images/extra_icons/icon_wibbly_arrows.svg"
import familiarIcon from "../../style/images/extra_icons/icon_i_know_this_one.svg"

import style from "./ContractIcon.module.css"

type Props = {
  serviceType: string | number | undefined
}

const ContractIcon = ({ serviceType }: Props) => {
  const spanStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  }
  logger("CONTRACT ICON: ", "normal", serviceType)

  let contractType
  if (serviceType) {
    contractType = getContractType(serviceType.toString())
  } else {
    contractType = "contract missing"
  }

  switch (contractType) {
    case "coin":
      return (
        <span style={spanStyle}>
          <img
            src={ninjaIcon}
            data-tip={"Coin"}
            className={style.iconImg}
            alt="coin"
          />
        </span>
      )
    case "drive":
      return (
        <span style={spanStyle}>
          <img
            src={familiarIcon}
            data-tip={"Conun Drive"}
            className={style.iconImg}
            alt="drive"
          />
        </span>
      )
    case "basic":
      return (
        <span style={spanStyle}>
          <img
            src={defaultIcon}
            data-tip={"Contract Deployment"}
            className={style.iconImg}
            alt="icon"
          />
        </span>
      )
    default:
      return <span style={spanStyle}>{contractType}</span>
  }
}

export default ContractIcon
