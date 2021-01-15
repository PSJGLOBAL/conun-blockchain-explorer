import axios from "axios"

const instance = axios.create({
  baseURL: "http://192.168.100.105:8080/api/",
})

instance.interceptors.request.use((request) => {
  console.log("AXIOS: request: ", request)
  return request
})
instance.interceptors.response.use(
  (response) => {
    console.log("AXIOS: response: ", response)
    return response
  },
  (error) => {
    console.log("AXIOS: error: ", error)
    return error
  }
)

export default instance
