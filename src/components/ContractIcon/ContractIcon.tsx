import ninjaIcon from "../../style/images/extra_icons/icon_ninja_star.svg"
import defaultIcon from "../../style/images/extra_icons/icon_wibbly_arrows.svg"
import familiarIcon from "../../style/images/extra_icons/icon_i_know_this_one.svg"

type Props = {
  serviceType: string | number
}

const ContractIcon = ({ serviceType }: Props) => {
  const spanStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  switch (serviceType) {
    case "coin":
    case "token":
    case "mycoin":
    case "conToken":
    case "conun":
      return (
        <span style={spanStyle}>
          <img
            src={ninjaIcon}
            data-tip={"Coin"}
            className="contract-icon-image"
            alt=""
          />
        </span>
      )

    case "ConunDrive":
    case "drive_1":
    case "drive":
      return (
        <span style={spanStyle}>
          <img
            src={familiarIcon}
            data-tip={"Conun Drive"}
            className="contract-icon-image"
            alt=""
          />
        </span>
      )

    case "_lifecycle":
    case "basic":
      return (
        <span style={spanStyle}>
          <img
            src={defaultIcon}
            data-tip={"Contract Deployment"}
            className="contract-icon-image"
            alt=""
          />
        </span>
      )

    default:
      return <span style={spanStyle}>{serviceType}</span>
  }
}

export default ContractIcon
