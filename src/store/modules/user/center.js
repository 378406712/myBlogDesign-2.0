import * as Api from '@/api/center'

const GET_STATUS = 'GET_STATUS'
const SET_VISIBLE = 'SET_VISIBLE'
const center = {
  /**
   * @param {string} status 更改密码的提示
   * @param {boolean} visible 提示框的显示隐藏
   */
  state: {
    status: '',
    visible: false
  },
  mutations: {
    [GET_STATUS](state, status) {
      state.status = status
    },
    [SET_VISIBLE](state, visible) {
      state.visible = visible
    }
  },
  actions: {
    /**
     * @param {Object} PwdData 更改密码
     */
    getStatus({ commit }, PwdData) {
      return new Promise((resolve, reject) => {
        Api.userPassAlter(PwdData).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    },
    deleteUser({ commit }, DelData) {
      console.log(DelData)
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
          console.log(res)
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    }
  }
}
export default center
