import { ChannelStats } from "../../components/ChannelStats/ChannelStats"

export const ExplorerInfoBlock = () => {
  return (
    <div className="channel-stats-block">
      <div className="section-block">
        <ChannelStats />
      </div>
      <div className="section-block">
        <div className="font-hilite">App Service</div>
      </div>
    </div>
  )
}
