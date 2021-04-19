import axios from "axios";
import {
  API_URL,
} from "../constants"
import store from "../store"

const baseRequestInstanceConfig = {
  baseURL: API_URL,
}
const requestInstance = axios.create(baseRequestInstanceConfig)

requestInstance.interceptors.request.use(
  config => {
    if (store.state.isAuthenticated) {
      return {
        ...config,
        headers: {
          "Authorization": "Basic "+ store.state.credentials
        }
      }
    } else {
      return config
    }
  }
)

requestInstance.interceptors.response.use((
  response) => {
    console.log("intercepted response")
    console.log(response)
    return response.data
  },
  error => {
    console.log("intercepted response error")
    console.log(error)
    return {
      status: false,
      data: null,
      error: error,
    }
  }
)

export default requestInstance