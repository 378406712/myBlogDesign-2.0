import * as Api from '@/api/center'
const GET_STATUS = 'GET_STATUS'
const SET_VISIBLE = 'SET_VISIBLE'
const GET_USERINFO = 'GET_USERINFO'
const SET_AVATAR = 'SET_AVATAR'
const center = {
  /**
   * @param {string} status 更改密码的提示
   * @param {boolean} visible 提示框的显示隐藏
   */
  state: {
    status: '',
    avatar: '',
    visible: false,
    form: { url: '' }
  },
  mutations: {
    [GET_STATUS](state, status) {
      state.status = status
    },
    [SET_VISIBLE](state, visible) {
      state.visible = visible
    },
    [GET_USERINFO](state, form) {
      state.form = form
    },
    [SET_AVATAR](state, avatar) {
      state.form.url = avatar
    }
  },
  actions: {
    alterPass({ commit }, PwdData) {
      return new Promise((resolve, reject) => {
        Api.userPassAlter(PwdData).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    },
    deleteUser({ commit }, DelData) {
      return new Promise((resolve, reject) => {
        Api.userRemove(DelData)
          .then(res => {
            commit(GET_STATUS, res.data.status)
            resolve()
          })
          .catch(() => reject())
      })
    },
    setInfo({ commit }, Info) {
      return new Promise((resolve, reject) => {
        Api.userInfoAdd(Info).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    },
    getInfo({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.userInfoGet(username).then(res => {
          if (res.data.length !== 0) {
            commit(GET_USERINFO, res.data)
          }

          resolve()
        })
      })
    }
  }
}
export default center
