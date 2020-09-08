import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import qs from 'qs'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token && getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    // 为每一个请求设置时间戳参数
    // config.params = {
    //   ...config.params,
    //   _t: new Date().getTime()
    // }
    if (store.getters.userId) {
      // 让每个请求携带userId
      config.headers['loginUserId'] = store.getters.userId
    }
    // 是否需要序列化
    // if (
    //   config.method === 'post' ||
    //   config.method === 'put' ||
    //   config.method === 'delete'
    // ) {
    //   config.data = qs.stringify(config.data);
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // 刷新token
    if (response.headers && response.headers.new_auth_token) {
      const newTokenInfo = response.headers.new_auth_token
      const tokenInfo = JSON.parse(newTokenInfo)
      const currentTime = new Date()
      const expTime = new Date(currentTime.getTime() + tokenInfo.expireTime)
      // console.log(tokenInfo.authToken + ',' + expTime)
      setToken(tokenInfo.authToken, expTime)
    }
    // 说明响应了
    if (response.status >= 200 && response.status < 300) {
      const res = response.data
      // 说明未授权
      if (res.code && res.code === 401) {
        Message({
          message: '无操作权限',
          type: 'warning'
        })
      } else if (res.code && res.code === 200) {
        return response
      } else if (!res.code) {
        return response
      } else {
        return Promise.reject(res)
      }
      // if (res.code && res.code !== 200) {
      //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      //   // 401:权限验证失败，没有token，或token过期
      //   if (res.code === 50008 || res.code === 50012 || res.code === 401) {
      //     // 请自行在引入 MessageBox
      //     // import { Message, MessageBox } from 'element-ui'
      //     MessageBox.confirm(
      //       '你已被登出，可以取消继续留在该页面，或者重新登录',
      //       '确定登出',
      //       {
      //         confirmButtonText: '重新登录',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //       }
      //     ).then(() => {
      //       store.dispatch('FedLogOut').then(() => {
      //         location.reload() // 为了重新实例化vue-router对象 避免bug
      //         // router.push('/login')
      //         router.push({
      //           path: '/login'
      //           // query: { redirect: location.hostname }
      //         })
      //       })
      //     })
      //   }
      //   return Promise.reject(res)
      // } else {
      //   return response
      // }
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // console.log('request.js err', error) // for debug
    const errResponse = error.response
    // const config = errResponse.config
    if (errResponse) {
      if (errResponse.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
          router.push({
            path: '/login'
          })
        })
      } else {
        const errMsg = errResponse.data.msg || error.message
        console.log('请求失败，异常：' + errMsg)
      }
    } else {
      console.log('请求失败: ' + error)
    }
    return Promise.reject(error)
  }
)

export default service
