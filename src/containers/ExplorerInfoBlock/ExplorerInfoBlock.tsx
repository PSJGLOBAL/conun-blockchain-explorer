import ChannelStats from "../../components/MainPage/ChannelStats/ChannelStats"
import style from "./ExplorerInfoBlock.module.css"

import cubeCombIcon from "../../style/images/extra_icons/icon_cube_comb.svg"
import ninjaIcon from "../../style/images/extra_icons/icon_ninja_star.svg"
import familiarIcon from "../../style/images/extra_icons/icon_i_know_this_one.svg"

const ExplorerInfoBlock = () => {
  return (
    <div className="channel-stats-block">
      {/* Network Stats */}
      <div className="section-block">
        <ChannelStats />
      </div>
      {/* App Services */}
      <div className={`section-block ${style.table}`}>
        <div className={style.titleRow}>
          <div className={style.title}>
            <span className="font-hilite">App Services</span>
          </div>
          <div className={style.description}>
            These are the services Conun provides:
          </div>
        </div>
        {/* Full Size Cells */}
        <div className={style.largeLayout}>
          <div className={style.row}>
            <img src={ninjaIcon} alt="coin" data-tip={"Coin"} />
            <div className={style.title}>Coin</div>
            <div className={style.description}>
              Coin token used for payment of services
            </div>
          </div>
          <div className={style.row}>
            <img src={familiarIcon} alt="drive" data-tip={"Drive"} />
            <div className={style.title}>Drive</div>
            <div className={style.description}>
              Decentralised peer-to-peer file transfer service
            </div>
          </div>
          <div className={style.row}>
            <img src={cubeCombIcon} alt="engine" data-tip={"Engine"} />
            <div className={style.title}>Engine</div>
            <div className={style.description}>
              Distributed supercomputing service
            </div>
          </div>
        </div>
        {/* Minimized Cells */}
        <div className={style.smallLayout}>
          <div className={style.row}>
            <img src={ninjaIcon} alt="coin" data-tip={"Payment of Services"} />
            <div className={style.title}>Coin</div>
          </div>
          <div className={style.row}>
            <img
              src={familiarIcon}
              alt="drive"
              data-tip={"Peer-to-peer file transfer"}
            />
            <div className={style.title}>Drive</div>
          </div>
          <div className={style.row}>
            <img
              src={cubeCombIcon}
              alt="engine"
              data-tip={"Distributed Supercomputing"}
            />
            <div className={style.title}>Engine</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorerInfoBlock
