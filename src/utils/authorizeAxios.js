import { logoutAPI, refreshTokenAPI } from '@/apis/apis'
import axios from 'axios'

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // auto refresh token
    if (error.message?.status === 401) {
      logoutAPI().then(() => {
        localStorage.removeItem('userInfo')
        location.href = '/'
      })
    }

    // Case server return GONE(410) => refresh token
    const originalRequest = error.config // save error request => error.config
    console.log('🚀 ~ originalRequest:', originalRequest)
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true // refresh token once time
      const refreshToken = localStorage.getItem('refreshToken')
      // Gọi API refresh token
      return refreshTokenAPI(refreshToken)
        .then(() => { 
          return authorizedAxiosInstance(originalRequest)
        })
        .catch((_err) => {
          logoutAPI().then(() => {
            localStorage.removeItem('userInfo')
            location.href = '/'
          })
          Promise.reject(_err)
        })
    }

    if (error.response?.status !== 410) {
      console.error('API error: ', error.message)
    }
    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
