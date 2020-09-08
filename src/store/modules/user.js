import {
  loginByUsername,
  logout,
  getUserInfo,
  getAsyncRouterInfo
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '@/store'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    userId: '',
    setting: {
      articlePlatform: []
    },
    groupName: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_GROUP_NAME: (state, groupName) => {
      state.groupName = groupName
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username.trim(), userInfo.password)
          .then(response => {
            const data = response.data.data
            commit('SET_TOKEN', data.authToken)
            const currentTime = new Date()
            const expTime = new Date(currentTime.getTime() + data.expireTime)
            setToken(data.authToken, expTime)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            if (!response.data.data) {
              reject('数据异常，请重试！')
            }
            const data = response.data.data.user
            // roles must be a non-empty array
            const roles = data.roleKey
            if (!roles || roles.length <= 0) {
              reject('登录用户尚未授权，请联系管理员！')
            }
            commit('SET_ROLES', roles)
            commit('SET_NAME', data.name)
            // 保存userId
            commit('SET_USERID', data.id)
            // commit('SET_AVATAR', data.avatar)
            // commit('SET_INTRODUCTION', data.introduction)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取路由信息,并设置用户信息
    GetAsyncRouterInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getAsyncRouterInfo()
          .then(response => {
            if (!response.data.data) {
              reject('数据异常，请重试！')
            }
            const data = response.data.data.user
            // roles must be a non-empty array
            const roles = data.roleKey
            if (!roles || roles.length <= 0) {
              reject('登录用户尚未授权，请联系管理员！')
            }
            commit('SET_ROLES', roles)
            commit('SET_NAME', data.name)
            // 保存userId
            commit('SET_USERID', data.id)
            commit('SET_GROUP_NAME', data.groupName)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()
            store.dispatch('tagsView/delAllViews', null, { root: true })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roleKey)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resetRouter()
          store.dispatch('tagsView/delAllViews', null, { root: true })
          resolve()
        })
      })
    }
  }
}

export default user
