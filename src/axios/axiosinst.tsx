import axios from "axios"
import { BASEURL } from "../utility/config.json"

const instance = axios.create({
  baseURL: BASEURL,
})

// instance.interceptors.request.use((request) => {
//   console.log("AXIOS: request: ", request)
//   return request
// })
// instance.interceptors.response.use(
//   (response) => {
//     console.log("AXIOS: response: ", response)
//     return response
//   },
//   (error) => {
//     console.error("AXIOS: error: ", error)
//     return error
//   }
// )

export default instance
