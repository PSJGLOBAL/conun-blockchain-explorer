export interface ObjectType {
  [key: string]: string | number
}
export interface SuperObjectType {
  [key: string]:
    | string
    | number
    | Array<ObjectType>
    | Array<SuperObjectType>
    | SuperObjectType
}

export type ChannelObject = {
  channel_genesis_hash: string
  channel_hash: string
  channelname: string
  createdat: string
  id: string
}

export type ContractType = {
  chaincodename: string
  codes: Array<ObjectType>
}

export type State = {
  basic: {
    activeChannel: ChannelObject
    availableChannels: Array<ObjectType>
    channelHash: string
    serverResponsive: boolean
    channelInfoData: ObjectType
    channelStats: ObjectType
  }
  block: {
    blockActivityData: Array<ObjectType>
  }
  txn: {
    txnActivityData: Array<ObjectType>
  }
  ctx: {
    contractData: Array<ContractType>
  }
}

export type GraphConfig = "weekly" | "daily"
