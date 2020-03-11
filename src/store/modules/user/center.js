import * as Api from '@/api/center'

const GET_STATUS = 'GET_STATUS'

const center = {
  state: {
    status: ''
  },
  mutations: {
    [GET_STATUS](state, status) {
      state.status = status
    }
  },
  actions: {
    getStatus({ commit }, PwdData) {
      console.log(PwdData)
      return new Promise((resolve, reject) => {
        Api.userPassAlter(PwdData).then(res => {
          console.log(res)
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    }
  }
}
export default center
