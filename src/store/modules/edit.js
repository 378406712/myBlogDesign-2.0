import * as Api from '@/api/edit'
//const SET_PIC = 'SET_PIC'
const GET_STATUS = 'GET_STATUS'
const SET_CATEGORY = 'SET_CATEGORY'
const GET_CATEGORY = 'GET_CATEGORY'
const GET_MEDIA = 'GET_MEDIA'
const Edit = {
  state: {
    status: '',
    category: [],
    media: []
  },
  mutations: {
    [GET_STATUS](state, status) {
      state.status = status
    },
    [GET_CATEGORY](state, category) {
      state.category = category
    },
    [GET_MEDIA](state, media) {
      state.media = media
      console.log(state.media)
    }
  },
  actions: {
    PostEssay({ commit }, EssayData) {
      return new Promise((resolve, reject) => {
        Api.PostEssay(EssayData).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    },
    SetCategory({}, CategoryData) {
      return new Promise((resolve, reject) => {
        Api.SetCategory(CategoryData).then(res => {
          console.log(res.data.status)
          // commit(SET_CATEGORY, res.data)
          resolve()
        })
      })
    },
    GetCategory({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetCategory(username).then(res => {
          commit(GET_MEDIA, res.data)
          resolve()
        })
      })
    },
    GetMedia({ commit }, username) {
      console.log(username)
      return new Promise((resolve, reject) => {
        Api.GetMedia(username)
          .then(res => {
            console.log(res, '00000')
            commit(GET_MEDIA, res.data)
            resolve()
          })
          .then(() => reject())
      })
    }
  }
}
export default Edit
