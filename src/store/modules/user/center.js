import * as Api from '@/api/center'

const GET_STATUS = 'GET_STATUS'

const center = {
  /**
   * @param {String} status 更改密码的提示(密码修改错误/重复/成功)
   */
  state: {
    status: ''
  },
  mutations: {
    [GET_STATUS](state, status) {
      state.status = status
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
    }
  }
}
export default center
