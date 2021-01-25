export interface ObjectType {
  [key: string]: string | number
}

export type ChannelObject = {
  channel_genesis_hash: string | number | null
  channel_hash?: string | number | null
  channelname: string | number | null
  createdat: string | number | null
  id: number | string | null
}

export type State = {
  basic: {
    activeChannel: ChannelObject
    availableChannels: Array<ObjectType>
    channelHash: string
    serverResponsive: boolean
    channelInfoData: ObjectType
  }
  block: {
    blockActivityData: Array<ObjectType>
  }
  txn: {
    txnActivityData: Array<ObjectType>
  }
}
