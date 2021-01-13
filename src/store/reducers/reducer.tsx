import { SET_CHANNEL_HASH } from "../actions"

// In TS an action must be of a strict format. Set them here:
type Action = {
  type: "SET_CHANNEL_HASH"
  payload?: { hash: string }
}

const initialState = {
  channelHash: "",
}

const testReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CHANNEL_HASH:
      if (!action.payload) {
        return state
      }

      return {
        ...state,
        channelHash: action.payload.hash,
      }

    default:
      return {
        ...state,
      }
  }
}

export default testReducer
