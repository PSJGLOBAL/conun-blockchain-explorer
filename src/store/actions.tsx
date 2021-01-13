import { SET_CHANNEL_HASH } from "./actionTypes"

export const setChannelHash = (hash: string) => {
  return { type: SET_CHANNEL_HASH, payload: { hash: hash } }
}
