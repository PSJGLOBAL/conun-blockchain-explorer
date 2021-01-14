import { w3cwebsocket as W3CWebSocket } from "websocket"

const conunSocket = new W3CWebSocket(
  `ws://192.168.100.105:8080/api/blockActivity/fdfd720dc97577884b7d9fc7a5a347da6e61f7a5f80f9f6a6be982764554a884` // Change hard code here to variable
)

// useEffect(() => {
//   blockSocket.onopen = () => {
//     console.log("WS: BLOCK: Successfully subscribed to Block Activity")
//   }
//   blockSocket.onmessage = (message) => {
//     console.log("WS: BLOCK: Received data: ", message)
//   }
// }, [blockSocket])

// useEffect(() => {
//   txnSocket.onopen = () => {
//     console.log("WS: TXN: Successfully subscribed to TXN Activity")
//   }
//   txnSocket.onmessage = (message) => {
//     console.log("WS: TXN: Received data: ", message)
//   }
// }, [txnSocket])
