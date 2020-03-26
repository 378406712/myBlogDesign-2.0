import * as Api from '@/api/edit'
//const SET_PIC = 'SET_PIC'
const GET_STATUS = 'GET_STATUS'
const Edit = {
  state: {
    // url: ''
    status: ''
  },
  mutations: {
    // [SET_PIC](state, url) {
    //   state.url = url
    //   console.log(state.url)
    // }
    [GET_STATUS](state, status) {
      state.status = status
    }
  },
  actions: {
    PostEssay({ commit }, EssayData) {
      console.log(EssayData)
      return new Promise((resolve, reject) => {
        Api.PostEssay(EssayData).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    }
  }
}
export default Edit
