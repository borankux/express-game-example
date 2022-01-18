import axios from 'axios'
import {GetToken, HasToken} from "../token";

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

http.interceptors.request.use((config) => {
  if (HasToken()) {
    config.headers = {
      'X-Game-Token': GetToken()
    }
  }
  return config
})
export default http
