import ninjaIcon from "../../style/images/extra_icons/icon_ninja_star.svg"
import defaultIcon from "../../style/images/extra_icons/icon_wibbly_arrows.svg"
import familiarIcon from "../../style/images/extra_icons/icon_i_know_this_one.svg"

type Props = {
  serviceType: string | number
}

const ContractIcon = ({ serviceType }: Props) => {
  let contractIcon

  switch (serviceType) {
    case "coin":
    case "token":
    case "mycoin":
    case "conToken":
    case "conun":
      contractIcon = (
        <img
          src={ninjaIcon}
          data-tip={"Coin"}
          className="contract-icon-image"
          alt=""
        />
      )
      break

    case "ConunDrive":
    case "drive_1":
    case "drive":
      contractIcon = (
        <img
          src={familiarIcon}
          data-tip={"Conun Drive"}
          className="contract-icon-image"
          alt=""
        />
      )
      break
    case "_lifecycle":
    case "basic":
      contractIcon = (
        <img
          src={defaultIcon}
          data-tip={"Contract Deployment"}
          className="contract-icon-image"
          alt=""
        />
      )
      break
    default:
      contractIcon = serviceType
  }

  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contractIcon}
    </span>
  )
}

export default ContractIcon
