import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'
import {
  Promise
} from 'q'

// 创建axios实例
let baseUrl = ''
if (process.env.NODE_ENV == 'development') {
  baseUrl = process.env.BASE_API
} else {
  baseUrl += `${window.location.protocol}//${window.location.hostname}`
}

const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: baseUrl, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  response => {
    console.log('TCL: response', response)
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (response.headers.authorization) {
      res.token = response.headers.authorization
    }
    if (res.code !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return response.data
    }
  },
  error => {
    if (error.response.status === 404) {
      // 404 没有查找对数据
      return {
        data: null
      }
    } else if (error.response.status === 400) {
      // 400 参数提交错误
      return Promise.reject(error)
    } else if (error.response.status === 401) {
      // 401:Token 过期了;
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject(error)
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
