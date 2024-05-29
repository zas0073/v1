import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getrefreshToken, getToken, setToken, setrefreshToken, getSessionDate, setSessionDate } from '@/utils/auth'
import logger from '@ckeditor/ckeditor5-dev-utils/lib/logger'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: process.env.VUE_APP_BASE_REQUEST_TIMEOUT // 수정일자(2023.01.18)
  // timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    
    const cookieToken = getToken()
    const cookieRefreshToken = getrefreshToken()
    const cookieSessionDate = getSessionDate()
    // do something before request is sent
    
    if (store.state.user.token === undefined || store.state.user.token === '') {
      store.state.user.token = cookieToken
    }
    
    if (store.state.user.refreshToken === undefined || store.state.user.refreshToken === '') {
      store.state.user.refreshToken = cookieRefreshToken
    }
    
    if (store.state.user.sessionDate === undefined || store.state.user.sessionDate === '') {
      store.state.user.sessionDate = cookieSessionDate
    }
    
    if (store.state.user.token && store.state.user.refreshToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'Bearer ' + store.state.user.token
      config.headers['refreshAuthorization'] = 'Bearer ' + store.state.user.refreshToken
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    
    const headers = response.headers
    const res = response.data
    const message = res.message || (res.data && res.data.message) || res.data
    if (res instanceof Blob) {
      
      // jwt 인증을 통한 파일 다운로드
      // 파일 로컬 파일로 저장하기위해 header 가 필요하여, response 전체를 반환
      return response

    // if the custom code is not 20000, it is judged as an error.
    } else if (res.code !== 'REQUEST_SUCCESS') {
      
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 2 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(message || 'Error'))
    } else {
      
      const token = headers['authorization']
      const cookieToken = getToken()
      const refreshToken = headers['refreshauthorization']
      const cookieRefreshToken = getrefreshToken()
      if (token !== cookieToken) {
        store.state.user.token = token
        setToken(token)

      }
      
      if (refreshToken !== cookieRefreshToken) {
        
        store.state.user.refreshToken = refreshToken
        setrefreshToken(refreshToken)
      }
      
      const currentDate = new Date()
      store.state.user.sessionDate = JSON.stringify(new Date(currentDate.getTime() + process.env.VUE_APP_SESSIONTIME * 1000))
      setSessionDate(store.state.user.sessionDate)

      return res
    }
  },
  error => {
    
    const res = error.response
    if (!res) {
      return Promise.reject(error)
    }
    
    let message = res.message || (res.data && res.data.message) || res.data || error.message
    console.log('error.response', error.response)
    if (res.status === 401) {
      message = '세션이 만료되었거나 잘못된 경로로 접근하였습니다.'
      location.href = '/'
      store.dispatch('user/logout')
      router.push('login')
      return null
    } else if (res.status === 404) {
      message = '오류가 발생하였습니다.'
    } else if (res.status === 405) {
      message = '잘못된 호출입니다.'
    } else if (res.status === 500 && res.data != null && res.data.data != null) {
      message = res.data.data
    } else if (res.status === 500) {
      message = '서버 오류가 발생하였습니다.'
    }

    Message({
      message: message,
      type: 'error',
      duration: 3 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
