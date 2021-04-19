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
    return response.data
  },
  error => {
    return {
      status: false,
      data: null,
      error: error,
    }
  }
)

export default requestInstance