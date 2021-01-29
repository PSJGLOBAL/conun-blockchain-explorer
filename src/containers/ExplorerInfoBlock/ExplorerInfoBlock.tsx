import { ChannelStats } from "../../components/ChannelStats/ChannelStats"
import "./ExplorerInfoBlock.css"

export const ExplorerInfoBlock = () => {
  return (
    <div className="channel-stats-block">
      <div className="section-block">
        <ChannelStats />
      </div>
      <div className="section-block app-service-table">
        <div className="font-hilite">
          <span>App Service</span>
          <span className="app-service-icons">
            <i className="fas fa-hdd font-hilite"></i>
          </span>
        </div>
      </div>
    </div>
  )
}
