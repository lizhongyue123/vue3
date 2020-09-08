import request from '@/utils/request'
// import Qs from 'qs'
import md5 from 'js-md5'

const ip1 = 'loginIp/auth-server/sso-server'

// 登录
export function loginByUsername(username, password) {
  const data = {
    username,
    password: md5(password)
  }
  return request({
    url: `${ip1}/auth/login`,
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return request({
    url: `${ip1}/auth/logout`,
    method: 'post'
  })
}

// 获取用户信息
export function getUserInfo(name = 'health-index-calculator-web') {
  const params = {
    name: name
  }
  return request({
    url: `${ip1}/auth/getUserInfo`,
    method: 'get',
    params
  })
}

// 获取用户信息
export function getAsyncRouterInfo(name = 'health-index-calculator-web') {
  const params = {
    name: name
  }
  return request({
    url: `${ip1}/auth/getAsyncRouterInfo`,
    method: 'get',
    params
  })
}
