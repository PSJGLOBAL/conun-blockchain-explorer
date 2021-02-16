import { ChannelStats } from "../../components/MainPage/ChannelStats/ChannelStats"
import "./ExplorerInfoBlock.css"

import cubeCombIcon from "../../style/images/extra_icons/icon_cube_comb.svg"
import printIcon from "../../style/images/extra_icons/icon_fingerprint_circle.svg"
import familiarIcon from "../../style/images/extra_icons/icon_i_know_this_one.svg"
import linkyIcon from "../../style/images/extra_icons/icon_linky.svg"
import ninjaIcon from "../../style/images/extra_icons/icon_ninja_star.svg"
import oldSquareIcon from "../../style/images/extra_icons/icon_ode_scool_square.svg"
import pointDiaIcon from "../../style/images/extra_icons/icon_pointy_diamond.svg"
import wCornerIcon from "../../style/images/extra_icons/icon_wave_corner.svg"
import wArrowsIcon from "../../style/images/extra_icons/icon_wibbly_arrows.svg"
import chainDiaIcon from "../../style/images/extra_icons/icon_wibbly_chain_diamond.svg"
import wDiamondIcon from "../../style/images/extra_icons/icon_wibbly_diamond.svg"
import tartanIcon from "../../style/images/extra_icons/icon_wibbly_tartan.svg"

export const ExplorerInfoBlock = () => {
  return (
    <div className="channel-stats-block">
      <div className="section-block">
        <ChannelStats />
      </div>
      <div className="section-block app-service-table">
        <div className="app-service-title ">
          <span className="font-hilite">App Service</span>
        </div>
        <div className="app-service-icons">
          <span className="app-service-icon-unit">
            <img src={cubeCombIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={wDiamondIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={familiarIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={linkyIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={wArrowsIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img
              src={oldSquareIcon}
              className="app-service-icon-image"
              alt=""
            />
          </span>
        </div>
      </div>
      <div className="section-block app-service-table">
        <div className="app-service-title ">
          <span className="font-hilite">Other cool icons</span>
        </div>
        <div className="app-service-icons">
          <span className="app-service-icon-unit">
            <img src={pointDiaIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={wCornerIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={ninjaIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={chainDiaIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={printIcon} className="app-service-icon-image" alt="" />
          </span>
          <span className="app-service-icon-unit">
            <img src={tartanIcon} className="app-service-icon-image" alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}
