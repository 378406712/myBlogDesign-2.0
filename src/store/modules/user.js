import { login, userInfo, logout, devices } from '@/api/login'

import { getToken, setToken, removeToken } from '@/common/auth'

const SET_TOKEN = 'SET_TOKEN'
const SET_NAME = 'SET_NAME'
const SET_AGE = 'SET_AGE'
const SET_AVATAR = 'SET_AVATAR'
const SET_PERMISSIONS = 'SET_PERMISSIONS'
const SET_STATUS = 'SET_STATUS'
const SET_EMAIL = 'SET_EMAIL'
const user = {
  state: {
    token: getToken(),
    name: '',
    // age: 0,
    avatar: '',
    permissions: '',
    status: '123',
    e_mail: ''
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_NAME](state, name) {
      state.name = name
    },
    [SET_AGE](state, age) {
      state.age = age
    },
    [SET_AVATAR](state, avatar) {
      state.avatar = avatar
    },
    [SET_PERMISSIONS](state, permissions) {
      state.permissions = permissions
    },
    [SET_STATUS](state, status) {
      state.status = status
    },
    [SET_EMAIL](state, e_mail) {
      state.e_mail = e_mail
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(resp => {
            const { data } = resp
            console.log(data)
            commit(SET_EMAIL, data.e_mail)
            commit(SET_STATUS, data.status)
            if (data.status === 1) {
              setToken(data.token)
              commit(SET_TOKEN, data.token)
            }
            return resolve()
          })
          .catch(err => {
            return reject(err)
          })
      })
    },
    setDevices({}, deviceInfo) {
      return new Promise((resolve, reject) => {
        devices(deviceInfo)
          .then(() => {
            return resolve()
          })
          .catch(err => {
            return reject(err)
          })
      })
    },

    // 拉取用户信息
    pullUserInfo({ commit }, username) {
      return new Promise((resolve, reject) => {
        userInfo({
          username
        })
          .then(resp => {
            let data = resp.data
            commit(SET_NAME, data.username)
            commit(SET_EMAIL, data.e_mail)
            commit(SET_AVATAR, data.avatar)
            commit(SET_PERMISSIONS, data.permission)
            return resolve(data)
          })
          .catch(err => {
            return reject(err)
          })
      })
    },
    // 用户退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(resp => {
            removeToken()
            commit(SET_TOKEN, '')
            commit(SET_NAME, '')
            return resolve()
          })
          .catch(err => {
            return reject(err)
          })
      })
    }
  },
  getters: {
    token: state => state.token,
    name: state => state.name,
    age: state => state.age,
    avatar: state => state.avatar,
    e_mail: state => state.e_mail,
    permissions: state => state.permissions
  }
}

export default user
