export interface ObjectType {
  [key: string]: string | number
}

export type State = {
  basic: {
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
