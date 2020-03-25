import * as Api from '@/api/edit'
const SET_PIC = 'SET_PIC'

const Edit = {
  state: {
    url: ''
  },
  mutations: {
    [SET_PIC](state, url) {
      state.url = url
      console.log(state.url)
    }
  },
  actions: {
    setPic({ commit }, PicData) {
      console.log(PicData)
      return new Promise((resolve, reject) => {
        Api.sendPic(PicData).then(res => {
          commit(SET_PIC, res.data)
          resolve()
        })
      })
    }
  }
}
export default Edit
