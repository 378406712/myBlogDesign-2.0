import * as Api from '@/api/center'
const GET_STATUS = 'GET_STATUS'
const SET_VISIBLE = 'SET_VISIBLE'
const GET_USERINFO = 'GET_USERINFO'
const center = {
  /**
   * @param {string} status 更改密码的提示
   * @param {boolean} visible 提示框的显示隐藏
   */
  state: {
    status: '',
    visible: false,
    form: {}
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
      console.log(Info)
      return new Promise((resolve, reject) => {
        Api.userInfoAdd(Info).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    },
    getInfo({ commit }, username) {
      console.log(username)
      return new Promise((resolve, reject) => {
        Api.userInfoGet(username).then(res => {
          commit(GET_USERINFO, res.data)
          resolve()
        })
      })
    }
  }
}
export default center
